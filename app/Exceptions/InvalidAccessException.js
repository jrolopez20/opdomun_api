'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

const defaultMessage = 'The request is understood, but it has been refused or access is not allowed.'

class InvalidAccessException extends LogicalException {

    constructor (message) {
        super(message || defaultMessage)
    }

    /**
     * You can't access this resource!
     */
    handle(error, {response}) {
        return response.status(403).json({
            message: error.message
        });
    }
}

module.exports = InvalidAccessException
