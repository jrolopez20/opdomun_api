'use strict'

const Post = use('App/Models/Post');

class CurrencyService {

    static CURRENCIES() {
        return {
            CUC: 'CUC',
            CUP: 'CUP',
            USD: 'USD',
            EUR: 'EUR'
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
     * Convert
     * @param value
     * @param from
     * @param to
     * @returns {*}
     */
    static transform(value, from, to) {
        // TODO apply conversion rates
        return value;
    }

    /**
     * Format post price based on user preferences
     * @param post
     * @param user
     */
    static formatPostPrice(post, user) {
        if (user.preferredCurrency !== CurrencyService.DEFAULT_CURRENCY()) {
            post.price.value = CurrencyService.transform(
                post.price.value,
                post.price.currency,
                user.preferredCurrency
            );
            post.price.currency = user.preferredCurrency
        }
        return post;
    }
}

module.exports = CurrencyService;
