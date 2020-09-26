'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const Provincia = use('App/Models/Provincia')

/**
 * Resourceful controller for interacting with provincias
 */
class ProvinciaController {

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
        const provincias = await Provincia.getProvincias();
        return response.json(provincias)
    }

}

module.exports = ProvinciaController;
