'use strict'

use('App/Validators/PriceValidator');

class StoreSubscription {
    get rules() {
        return {
            provinciaId: 'required|number',
            municipios: 'required|array',
            homeTypes: 'required|array',
            minPrice: 'required|object|price',
            maxPrice: 'required|object|price',
            bedrooms: 'required|number',
            bathrooms: 'required|number'
        }
    }

    get messages() {
        return {
            'provinciaId.required': 'You must provide a provinciaId',
            'provinciaId.number': 'The field provinciaId must be a number',
            'municipios.required': 'You must provide at least one municipio',
            'municipios.array': 'The field municipio must be an array',
            'homeTypes.required': 'You must provide at leat one homeType',
            'homeTypes.array': 'The field homeType must be an array',
            'minPrice.required': 'The field minPrice is required',
            'maxPrice.required': 'The field maxPrice is required',
            'bedrooms.required': 'The field bedrooms is required',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'The field bathrooms is required',
            'bathrooms.number': 'The field bathrooms must be a number',
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StoreSubscription;
