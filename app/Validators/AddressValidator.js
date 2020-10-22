'use strict'
const Validator = use('Validator');

const checkAddress = async (data, field, message, args, get) => {
    if(!data[field].localidad || !data[field].localidad.id) {
        throw 'Address required localidad'
    }
    if(isNaN(data[field].localidad.id)) {
        throw 'The field localidad id in address must be a number'
    }
    if(!data[field].description) {
        throw 'Address required description property'
    }
}
Validator.extend('address', checkAddress);

module.exports = checkAddress;
