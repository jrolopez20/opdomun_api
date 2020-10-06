'use strict'

const {LogicalException} = require('@adonisjs/generic-exceptions')

const defaultMessage = 'The URI requested is invalid or the resource requested does not exists.'

class ResourceNotFoundException extends LogicalException {

    constructor (message) {
        super(message || defaultMessage)
    }

    /**
     * Handle this exception by itself
     */
    handle(error, {response}) {
        return response.status(404).json({
            message: error.message
        });
    }
}

module.exports = ResourceNotFoundException
