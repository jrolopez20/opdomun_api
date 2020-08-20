'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const Office = use('App/Models/Office')

/**
 * Resourceful controller for interacting with offices
 */
class OfficeController {

    /**
     * Show a list of all provincias.
     * GET provincias
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const offices = await Office.getOffices(page, limit);
        return response.json(offices)
    }

}

module.exports = OfficeController;
