'use strict'

const Localidad = use('App/Models/Localidad');

/**
 * Resourceful controller for interacting with localidades
 */
class LocalidadController {

    /**
     * Show a list of all localidades.
     * GET municipios
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({params, request, response}) {
        const localidades = await Localidad.getLocalidades(params.id);
        return response.json(localidades);
    }

}

module.exports = LocalidadController;
