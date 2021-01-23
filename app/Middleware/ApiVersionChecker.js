'use strict'

const IncompatibleApiVersionException = use('App/Exceptions/IncompatibleApiVersionException');
const ApiVersionSeckerService = use('App/Services/ApiVersionSeckerService');

class ApiVersionChecker {

    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({request}, next) {
        const apiAcceptedVersion = request.headers()['api-accepted-version'];

        if (apiAcceptedVersion && !ApiVersionSeckerService.isValidVersion(apiAcceptedVersion)) {
            throw new IncompatibleApiVersionException()
        }

        // call next to advance the request
        await next()
    }
}

module.exports = ApiVersionChecker
