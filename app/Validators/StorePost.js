'use strict'

const Validator = use('Validator');

const checkAddress = async (data, field, message, args, get) => {
    if(!data[field].localidad_id) {
        throw 'Address required localidad_id field'
    }
    if(isNaN(data[field].localidad_id)) {
        throw 'The field localidad_id in address must be a number'
    }
    if(!data[field].street) {
        throw 'Address required street field'
    }
}
Validator.extend('address', checkAddress);

class StorePost {
    get rules() {
        return {
            address: 'required|object|address',
            price: 'number',
            area: 'required|number',
            bedrooms: 'required|number',
            bathrooms: 'required|number',
            home_type_id: 'required|number',
            plan_id: 'number'
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
