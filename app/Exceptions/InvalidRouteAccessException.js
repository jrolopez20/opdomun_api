'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

class InvalidRouteAccessException extends LogicalException {
    /**
     * You can't access this resource!
     */
    handle(error, {response, request}) {
        return response.status(403).json({
            message: `You have not access to this route ${request.method()} ${request.url()}`
        });
    }
}

module.exports = InvalidRouteAccessException
