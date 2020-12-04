'use strict'

use('App/Validators/PriceValidator');

class StoreSubscription {
    get rules() {
        return {
            provincia: 'required|object',
            owner: 'required|object',
            municipios: 'array',
            homeTypes: 'array',
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
            'municipios.array': 'The field municipios must be an array',
            'homeTypes.array': 'The field homeTypes must be an array',
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
