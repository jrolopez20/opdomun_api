'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(400).json({
            message: 'The request was invalid or cannot be otherwise served.'
        });
    }
}

module.exports = BadRequestException
