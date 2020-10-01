'use strict'

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
        const provinciaId = params.id;
        const municipios = await Municipio.getMunicipios(provinciaId);
        return response.json(municipios);
    }

}

module.exports = MunicipioController;
