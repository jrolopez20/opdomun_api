'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

const defaultMessage = 'The request was invalid or cannot be otherwise served.'

class BadRequestException extends LogicalException {

    constructor (message) {
        super(message || defaultMessage)
    }

    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(400).json({
            message: error.message
        });
    }
}

module.exports = BadRequestException
