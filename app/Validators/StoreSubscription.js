'use strict'

class StoreSubscription {
    get rules() {
        return {
            provincia_id: 'required|number',
            municipio: 'required|array',
            home_type: 'required|array',
            min_price: 'required|number',
            max_price: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            fullname: 'required',
            telephone: 'required|number',
            email: 'required|email'
        }
    }

    get messages() {
        return {
            'provincia_id.required': 'You must provide a provincia_id',
            'provincia_id.number': 'The field provincia_id must be a number',
            'municipio.required': 'You must provide at least one municipio',
            'municipio.array': 'The field municipio must be an array',
            'home_type.required': 'You must provide at leat one home_type',
            'home_type.array': 'The field home_type must be an array',
            'min_price.required': 'The field min_price is required',
            'min_price.number': 'The field min_price must be a number',
            'max_price.required': 'The field max_price is required',
            'max_price.number': 'The field max_price must be a number',
            'bedrooms.required': 'The field bedrooms is required',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'The field bathrooms is required',
            'bathrooms.number': 'The field bathrooms must be a number',
            'fullname.required': 'The field fullname is required',
            'telephone.required': 'The field telephone is required',
            'telephone.number': 'The field telephone must be a number',
            'email.required': 'The field email is required',
            'email.email': 'The field email must be a valid email address'

        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StoreSubscription;
