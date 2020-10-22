'use strict'

use('App/Validators/AddressValidator');
use('App/Validators/PriceValidator');

class StorePost {
    get rules() {
        return {
            address: 'required|object|address',
            price: 'object|price',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            homeType: 'required|object',
            plan: 'object',
        }
    }

    get messages() {
        return {
            'address.required': 'You must provide address info',
            'address.object': 'The field address must be a valid address object',
            'price.object': 'The field price must be a valid price object',
            'area.required': 'You must provide an area.',
            'area.number': 'The field area must be a number',
            'bedrooms.required': 'You must provide a bedrooms.',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'You must provide a bathrooms.',
            'bathrooms.number': 'The field bathrooms must be a number',
            'homeType.required': 'You must provide a homeType.',
            'homeType.object': 'The field homeType must be a valid homeType object',
            'builtYear.number': 'The field builtYear must be a number',
            'plan.object': 'The field plan must be a valid plan object'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StorePost;
