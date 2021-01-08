'use strict'

class CurrencyService {

    static CURRENCIES() {
        return {
            CUP: 'CUP',
            USD: 'USD'
        }
    }

    /**
     * Currency used to show prices
     * @returns {string}
     * @constructor
     */
    static DEFAULT_CURRENCY() {
        return CurrencyService.CURRENCIES().CUP
    }

    /**
     * Currency used for property manipulation
     * @returns {string}
     * @constructor
     */
    static BASE_CURRENCY() {
        return CurrencyService.CURRENCIES().CUP
    }

    /**
     * Tranform price value between currencies
     * @param value
     * @param from
     * @param to
     * @returns {*}
     */
    static transform(value, from, to) {
        from = from.toUpperCase();
        to = to.toUpperCase();
        if (from === to) {
            return value
        } else if (from === CurrencyService.CURRENCIES().CUP && to === CurrencyService.CURRENCIES().USD) {
            value = value / 24
        } else {
            value = value * 24
        }

        return value
    }

    /**
     * Format price based on user preferences
     * @param price
     * @param user
     * @returns {{currency, value: *}|*}
     */
    static formatPrice(price, user) {
        if (price && user && user.preferredCurrency !== CurrencyService.DEFAULT_CURRENCY()) {
            return {
                value: Math.round(CurrencyService.transform(
                    price.value,
                    price.currency,
                    user.preferredCurrency
                )),
                currency: user.preferredCurrency
            }
        }
        return price;
    }
}

module.exports = CurrencyService
