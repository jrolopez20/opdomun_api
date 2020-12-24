'use strict'

const BenchmarkPriceService = use('App/Services/BenchmarkPriceService');


/**
 * Resourceful controller for interacting with benchmarkprices
 */
class BenchmarkPriceController {
    /**
     * Calculate benchmark price an tax based on parameters.
     * GET benchmarkprices
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response, auth}) {
        const {locationCategoryId, architecturalTypologyId, rooms, garage, garden} = request.all();

        const result = await BenchmarkPriceService.calculate(locationCategoryId, architecturalTypologyId, rooms, garage, garden, auth);

        return response.json(result);
    }

}

module.exports = BenchmarkPriceController
