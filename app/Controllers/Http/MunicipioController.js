'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const Municipio = use('App/Models/Municipio');

/**
 * Resourceful controller for interacting with municipios
 */
class MunicipioController {

    /**
     * Show a list of all municipios.
     * GET municipios
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({params, request, response}) {
        const provinciaId = params.provinciaId;
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = request.input('filter');
        const municipios = await Municipio.getMunicipios(provinciaId, page, limit, filter);
        return response.json(municipios);
    }

}

module.exports = MunicipioController;
