'use strict'

class StoreSubscription {
    get rules() {
        return {
            provinciaId: 'required|number',
            municipio: 'required|array',
            homeType: 'required|array',
            minPrice: 'required|number',
            maxPrice: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number'
        }
    }

    get messages() {
        return {
            'provinciaId.required': 'You must provide a provinciaId',
            'provinciaId.number': 'The field provinciaId must be a number',
            'municipio.required': 'You must provide at least one municipio',
            'municipio.array': 'The field municipio must be an array',
            'homeType.required': 'You must provide at leat one homeType',
            'homeType.array': 'The field homeType must be an array',
            'minPrice.required': 'The field minPrice is required',
            'minPrice.number': 'The field minPrice must be a number',
            'maxPrice.required': 'The field maxPrice is required',
            'maxPrice.number': 'The field maxPrice must be a number',
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
