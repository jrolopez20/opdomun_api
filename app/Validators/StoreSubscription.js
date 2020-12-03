'use strict'

use('App/Validators/PriceValidator');

class StoreSubscription {
    get rules() {
        return {
            provincia: 'required|object',
            owner: 'required|object',
            municipios: 'required|array',
            homeTypes: 'required|array',
            maxPrice: 'required|object|price',
            bedrooms: 'number',
            bathrooms: 'number'
        }
    }

    get messages() {
        return {
            'provincia.required': 'You must provide provincia',
            'provincia.object': 'The field provincia must be an object',
            'owner.required': 'You must provide owner info',
            'owner.object': 'The field owner must be a valid owner object',
            'municipios.required': 'You must provide at least one municipio',
            'municipios.array': 'The field municipio must be an array',
            'homeTypes.required': 'You must provide at leat one homeType',
            'homeTypes.array': 'The field homeType must be an array',
            'maxPrice.required': 'The field maxPrice is required',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.number': 'The field bathrooms must be a number',
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StoreSubscription;
