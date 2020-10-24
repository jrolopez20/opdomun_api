'use strict'

use('App/Validators/AddressValidator');
use('App/Validators/PriceValidator');

class TaxCalculator {
    get rules() {
        return {
            locationCategoryId: 'required|number',
            architecturalTypologyId: 'required|number',
            rooms: 'required|number',
            garage: 'required|boolean',
            garden: 'boolean'
        }
    }

    get messages() {
        return {
            'locationCategoryId.required': 'You must provide locationCategoryId',
            'locationCategoryId.number': 'The field locationCategoryId must be a number',
            'architecturalTypologyId.required': 'You must provide architecturalTypologyId',
            'architecturalTypologyId.number': 'The field architecturalTypologyId must be a number',
            'rooms.required': 'You must provide rooms',
            'rooms.number': 'The field rooms must be a number',
            'garage.required': 'You must provide garage',
            'garage.boolean': 'The field garage must be boolean',
            'garden.boolean': 'The field garden must be boolean'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = TaxCalculator;
