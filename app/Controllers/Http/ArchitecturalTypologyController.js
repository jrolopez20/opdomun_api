'use strict'

const ArchitecturalTypology = use('App/Models/ArchitecturalTypology')

/**
 * Resourceful controller for interacting with architectural typologies
 */
class ArchitecturalTypologyController {
    /**
     * Show a list of all architectural typologies
     * @param request
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async index({request, response}) {
        const architecturalTypologies = await ArchitecturalTypology.getArchitecturalTypologies();
        return response.json(architecturalTypologies)
    }
}

module.exports = ArchitecturalTypologyController
