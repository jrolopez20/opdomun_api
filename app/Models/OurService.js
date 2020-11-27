'use strict'

const Model = use('Model')
const CurrencyService = use('App/Services/CurrencyService')

class OurService extends Model {
    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static OUR_SERVICE_TYPES() {
        return {
            PREMIUM_POST: 'PREMIUM_POST',
            FREE_POST: 'FREE_POST',
            PURCHASE_POST: 'PURCHASE_POST',
            APPRAISAL: 'APPRAISAL',
            TAX_CALCULATOR: 'TAX_CALCULATOR'
        }
    }

    /**
     * Return price as object
     * @param price
     * @returns {{currency: string, value: number}}
     */
    getPrice(price) {
        return {
            value: CurrencyService.transform(price, CurrencyService.BASE_CURRENCY(), CurrencyService.DEFAULT_CURRENCY()),
            currency: CurrencyService.DEFAULT_CURRENCY(),
        }
    }

    /**
     * Price setter
     * @param price
     * @returns {*}
     */
    setPrice(price) {
        return price ? CurrencyService.transform(price.value, price.currency, CurrencyService.BASE_CURRENCY()) : null;
    }

    static async getOurServices(page = 1, limit = 20, filter = null) {
        const query = OurService
            .query()

        if (filter) {
            let where = "(title ilike '%" + filter + "%') OR (description ilike '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        const result = await query.paginate(page, limit);
        return result.toJSON();
    }
}

module.exports = OurService
