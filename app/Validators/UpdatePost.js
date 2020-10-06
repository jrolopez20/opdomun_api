'use strict'

use('App/Validators/AddressValidator');

class UpdatePost {
    get rules() {
        return {
            address: 'required|object|address',
            area: 'required|number',
            price: 'number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            homeTypeId: 'required|number',
            sold: 'number'
        }
    }

    get messages() {
        return {
            'address.required': 'You must provide address info',
            'address.object': 'The field address must be a valid address object',
            'price.number': 'The field price must be a number',
            'area.required': 'You must provide an area.',
            'area.number': 'The field area must be a number',
            'bedrooms.required': 'You must provide a bedrooms.',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'You must provide a bathrooms.',
            'bathrooms.number': 'The field bathrooms must be a number',
            'homeTypeId.required': 'You must provide a homeTypeId.',
            'homeTypeId.number': 'The field homeTypeId must be a number',
            'builtYear.number': 'The field homeTypeId must be a number',
            'sold.number': 'The field sold must be a number'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = UpdatePost;
