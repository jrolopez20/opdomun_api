'use strict'

const OurService = use('App/Models/OurService');
const OurServiceService = use('App/Services/OurServiceService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
const BadRequestException = use('App/Exceptions/BadRequestException');

/**
 * Resourceful controller for interacting with ourservices
 */
class OurServiceController {
    /**
     * Show a list of all ourservices.
     * GET ourservices
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = request.input('filter');

        const result = await OurService.getOurServices(page, limit, filter);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Create/save a new ourservice.
     * POST ourservices
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response}) {
        try {
            const {type, title, description, price} = request.all();
            const service = await OurServiceService.addService({type, title, description, price})
            return response.status(201).json(service)
        } catch (e) {
            if (e.code === '23505') {
                throw new BadRequestException('El servicio que está intentando crear ya existe');
            } else {
                return response.status(400).json({message: e.message})
            }
        }
    }

    /**
     * Display a single ourservice.
     * GET ourservices/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async show({params, response}) {
        try {
            const ourService = await OurService.findOrFail(params.id);
            return response.json(ourService);
        } catch (e) {

            throw new ResourceNotFoundException()
        }
    }

    /**
     * Update ourservice details.
     * PUT or PATCH ourservices/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        const {type, title, description, price} = request.all();
        const result = await OurServiceService.setService(params.id, {type, title, description, price});
        return response.json(result);
    }

    /**
     * Delete a ourservice with id.
     * DELETE ourservices/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        await OurServiceService.destroyService(params.id);
        return response.status(204).json(null);
    }
}

module.exports = OurServiceController
