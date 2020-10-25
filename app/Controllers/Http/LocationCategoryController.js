'use strict'

const LocationCategory = use('App/Models/LocationCategory')

/**
 * Resourceful controller for interacting with location categories
 */
class LocationCategoryController {
    /**
     * Show a list of all location categories
     * @param request
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async index({request, response}) {
        const locationCategories = await LocationCategory.getLocationCategories();
        return response.json(locationCategories)
    }
}

module.exports = LocationCategoryController
