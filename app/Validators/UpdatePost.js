'use strict'

class UpdatePost {
    get rules() {
        return {
            address: 'required',
            area: 'required|number',
            price: 'number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            home_type_id: 'required|number',
            built_year: 'number',
            sold: 'number'
        }
    }

    get messages() {
        return {
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
            'built_year.number': 'The field home_type_id must be a number',
            'sold.number': 'The field sold must be a number'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = UpdatePost;
