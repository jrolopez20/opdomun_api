'use strict'

use('App/Validators/AddressValidator');
use('App/Validators/PriceValidator');

class UpdateFreePost {
    get rules() {
        return {
            owner: 'required|object',
            price: 'required|object|price',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            homeTypeId: 'required|number',
        }
    }

    get messages() {
        return {
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
            'homeTypeId.required': 'You must provide a homeTypeId.',
            'homeTypeId.number': 'The field homeTypeId must be a number',
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = UpdateFreePost;
