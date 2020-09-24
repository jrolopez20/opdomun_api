'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

class UnauthorizedException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(401).json({
            message: 'Authentication credentials were missing or incorrect.'
        });
    }
}

module.exports = UnauthorizedException
