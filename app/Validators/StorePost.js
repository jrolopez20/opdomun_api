'use strict'

class StorePost {
    get rules() {
        return {
            municipio_id: 'required|number',
            address: 'required',
            price: 'number',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            home_type_id: 'required|number',
            built_year: 'number',
            plan_id: 'number'
        }
    }

    get messages() {
        return {
            'municipio_id.required': 'You must provide a municipio_id',
            'municipio_id.number': 'The field municipio_id must be a number',
            'address.required': 'You must provide an address',
            'price.number': 'The field price must be a number',
            'area.required': 'You must provide an area.',
            'area.number': 'The field area must be a number',
            'bedrooms.required': 'You must provide a bedrooms.',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'You must provide a bathrooms.',
            'bathrooms.number': 'The field bathrooms must be a number',
            'home_type_id.required': 'You must provide a home_type_id.',
            'home_type_id.number': 'The field home_type_id must be a number',
            'built_year.number': 'The field built_year must be a number',
            'plan_id.number': 'The field plan_id must be a number'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StorePost;
