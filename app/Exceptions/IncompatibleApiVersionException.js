'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')
const ErrorTypes = use('App/Exceptions/ErrorTypes');

class IncompatibleApiVersionException extends LogicalException {

    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(406).json({
            code: ErrorTypes.INCOMPATIBLE_VERSION,
            message: 'La versión que usando no es compatible con la Api. Por favor actualice su aplicación.'
        });
    }
}

module.exports = IncompatibleApiVersionException
