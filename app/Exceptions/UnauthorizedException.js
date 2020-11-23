'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

const defaultMessage = 'Authentication credentials were missing or incorrect.'

class UnauthorizedException extends LogicalException {

    constructor (message) {
        super(message || defaultMessage)
    }

    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(401).json({
            message: error.message
        });
    }
}

module.exports = UnauthorizedException
