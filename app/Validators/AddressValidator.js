'use strict'
const Validator = use('Validator');

const checkAddress = async (data, field, message, args, get) => {
    if(!data[field].localidadId) {
        throw 'Address required localidadId field'
    }
    if(isNaN(data[field].localidadId)) {
        throw 'The field localidadId in address must be a number'
    }
    if(!data[field].description) {
        throw 'Address required description field'
    }
}
Validator.extend('address', checkAddress);

module.exports = checkAddress;
