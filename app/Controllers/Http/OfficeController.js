'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Office = use('App/Models/Office')
const OfficeService = use('App/Services/OfficeService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

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
        const result = await Office.getOffices(page, limit);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Display a single office.
     * GET offices/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, response}) {
        try {
            const office = await Office.getOffice(params.id)
            return response.json(office)
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Create/save a new office.
     * POST offices
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response}) {
        try {
            const provincia = request.input('provincia');
            const office = await OfficeService.addOffice({provincia});

            return response.status(201).json(office)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Update office details.
     * PUT or PATCH offices/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        try {
            const provincia = request.input('provincia');
            const office = await OfficeService.setOffice(params.id, {provincia});

            return response.json(office);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Delete an office with id.
     * DELETE offices/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        try {
            const res = await OfficeService.destroyOffice(params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Cannot delete office');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = OfficeController;
