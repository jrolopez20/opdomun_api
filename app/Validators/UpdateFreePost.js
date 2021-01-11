'use strict'

use('App/Validators/AddressValidator');
use('App/Validators/PriceValidator');

class UpdateFreePost {
    get rules() {
        return {
            price: 'required|object|price',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            homeType: 'required|object',
            summary: 'required|max:1200'
        }
    }

    get messages() {
        return {
            'price.required': 'You must provide a price.',
            'price.object': 'The field price must be a valid price object',
            'area.required': 'You must provide an area.',
            'area.number': 'The field area must be a number',
            'bedrooms.required': 'You must provide a bedrooms.',
            'bedrooms.number': 'The field bedrooms must be a number',
            'bathrooms.required': 'You must provide a bathrooms.',
            'bathrooms.number': 'The field bathrooms must be a number',
            'homeType.required': 'You must provide a homeType.',
            'homeType.object': 'The field homeType must be a valid homeType object',
            'summary.required': 'El campo resumen es requerido',
            'summary.max': 'El campo resumen ha excedido la cantidad máxima de 1200 caracteres'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = UpdateFreePost;
