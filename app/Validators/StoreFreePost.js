'use strict'

use('App/Validators/AddressValidator');
use('App/Validators/PriceValidator');
// use('App/Validators/HomeType');

class StoreFreePost {
    get rules() {
        return {
            address: 'required|object|address',
            owner: 'required|object',
            price: 'required|object|price',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            homeType: 'required|object',
        }
    }

    get messages() {
        return {
            'address.required': 'You must provide address info',
            'address.object': 'The field address must be a valid address object',
            'owner.required': 'You must provide owner info',
            'owner.object': 'The field owner must be a valid owner object',
            'price.required': 'You must provide a price.',
            'price.object': 'The field price must be a valid price object',
            'area.required': 'You must provide an area.',
            'area.number': 'The field area must be a number',
            'bedrooms.required': 'You must provide a bedrooms.',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'You must provide a bathrooms.',
            'bathrooms.number': 'The field bathrooms must be a number',
            'homeType.required': 'You must provide a homeTypeId.',
            'homeType.object': 'The field homeType must be a valid homeType object',
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = StoreFreePost;