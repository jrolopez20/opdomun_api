'use strict'
const Validator = use('Validator');
const CurrencyService = use('App/Services/CurrencyService');

const checkPrice = async (data, field, message, args, get) => {
    if(data[field]) {
        if (!data[field].value) {
            throw 'Price required value property'
        }

        if (isNaN(data[field].value)) {
            throw 'The field value in price must be a number'
        }

        if (!data[field].currency) {
            throw 'Price required currency property'
        }

        if (!CurrencyService.CURRENCIES()[data[field].currency.toUpperCase()]) {
            throw `The currency ${data[field].currency} is not supported`
        }

        // Validate min value
        const valueCUP = CurrencyService.transform(
            data[field].value,
            data[field].currency,
            CurrencyService.CURRENCIES().CUP
        )
        if (valueCUP < 25000) {
            throw 'El precio debe ser mayor que 25000 CUP o su equivalente en USD'
        }
    }
}
Validator.extend('price', checkPrice);

module.exports = checkPrice;
