'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

class InvalidAccessException extends LogicalException {
    /**
     * You can't access this resource!
     */
    handle(error, {response}) {
        return response.status(403).json({
            message: 'The request is understood, but it has been refused or access is not allowed.'
        });
    }
}

module.exports = InvalidAccessException
