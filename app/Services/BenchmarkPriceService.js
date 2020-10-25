'use strict'

const BenchmarkPrice = use('App/Models/BenchmarkPrice');
const BadRequestException = use('App/Exceptions/BadRequestException');

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
    static async calculate(locationCategoryId, architecturalTypologyId, rooms, garage, garden = null) {
        const query = BenchmarkPrice
            .query()
            .where('locationCategoryId', locationCategoryId)
            .where('architecturalTypologyId', architecturalTypologyId)
            .where('rooms', (rooms < 4 ? rooms : 4))
            .where('garage', strToBool(garage))

        if(architecturalTypologyId !== 4) {
            if (strToBool(garden)) {
                query.where('garden', true)
            }else {
                query.whereNull('garden')
            }
        }


        try {
            const result = await query.first();

            return {
                referenceValue: result.referenceValue,
                tax: this.calculateTax(result.referenceValue)
            }
        } catch (e) {
            throw new BadRequestException('No se pudo calcular el precio referencial. Por favor verifique los datos de entrada');
        }
    }
}

module.exports = BenchmarkPriceService;
