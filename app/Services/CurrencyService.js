'use strict'

class CurrencyService {

    static CURRENCIES() {
        return {
            CUC: 'CUC',
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
        return CurrencyService.CURRENCIES().CUC
    }

    /**
     * Currency used for property manipulation
     * @returns {string}
     * @constructor
     */
    static BASE_CURRENCY() {
        return CurrencyService.CURRENCIES().USD
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
        if (from === CurrencyService.BASE_CURRENCY() || from === CurrencyService.CURRENCIES().CUC) {
            if (to === CurrencyService.CURRENCIES().CUP) {
                value = value * 25;
            }
        } else if (to === CurrencyService.BASE_CURRENCY() || to === CurrencyService.CURRENCIES().CUC) {
            if (from === CurrencyService.CURRENCIES().CUP) {
                value = value / 25;
            }
        }

        return value;
    }

    // /**
    //  * Format post price based on user preferences
    //  * @param post
    //  * @param user
    //  */
    // static formatPostPrice(post, user) {
    //     if (user.preferredCurrency !== CurrencyService.DEFAULT_CURRENCY()) {
    //         post.price.value = CurrencyService.transform(
    //             post.price.value,
    //             post.price.currency,
    //             user.preferredCurrency
    //         );
    //         post.price.currency = user.preferredCurrency
    //     }
    //     return post;
    // }

    /**
     * Format price based on user preferences
     * @param price
     * @param user
     * @returns {{currency, value: *}|*}
     */
    static formatPrice(price, user) {
        if (price && user && user.preferredCurrency !== CurrencyService.DEFAULT_CURRENCY()) {
            return {
                value: CurrencyService.transform(
                    price.value,
                    price.currency,
                    user.preferredCurrency
                ),
                currency: user.preferredCurrency
            }
        }
        return price;
    }
}

module.exports = CurrencyService
