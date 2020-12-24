'use strict'

const BenchmarkPrice = use('App/Models/BenchmarkPrice');
const BadRequestException = use('App/Exceptions/BadRequestException');
const CurrencyService = use('App/Services/CurrencyService')

function strToBool(s) {
    const regex = /^\s*(true|1)\s*$/i
    return regex.test(s)
}

class BenchmarkPriceService {

    /**
     * Calculate tax from a given value
     * @param referenceValue
     * @returns {number}
     */
    static calculateTax(referenceValue) {
        return referenceValue * 0.04
    }

    /**
     * Calculate benchmark price
     * @param locationCategoryId
     * @param architecturalTypologyId
     * @param rooms
     * @param garage
     * @param garden
     * @returns {Promise<{tax: number, referenceValue: number}>}
     */
    static async calculate(locationCategoryId, architecturalTypologyId, rooms, garage, garden = null, auth) {
        const query = BenchmarkPrice
            .query()
            .where('locationCategoryId', locationCategoryId)
            .where('architecturalTypologyId', architecturalTypologyId)
            .where('rooms', (rooms < 4 ? rooms : 4))
            .where('garage', strToBool(garage))

        if (parseInt(architecturalTypologyId) !== 4) {
            if (strToBool(garden)) {
                query.where('garden', true)
            } else {
                query.whereNull('garden')
            }
        }

        let user = null;
        try {
            user = await auth.getUser();
        } catch (e) {
        }
        const currentCurrency = user ? user.preferredCurrency : CurrencyService.DEFAULT_CURRENCY()

        try {
            const result = (await query.first()).toJSON();

            return {
                referenceValue: {
                    value: CurrencyService.transform(
                        result.referenceValue,
                        CurrencyService.DEFAULT_CURRENCY(),
                        currentCurrency
                    ),
                    currency: currentCurrency
                },
                tax: {
                    value: CurrencyService.transform(
                        this.calculateTax(result.referenceValue),
                        CurrencyService.DEFAULT_CURRENCY(),
                        currentCurrency
                    ),
                    currency: currentCurrency
                }
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestException('No se pudo calcular el precio referencial. Por favor verifique los datos de entrada');
        }
    }
}

module.exports = BenchmarkPriceService;
