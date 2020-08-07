'use strict'

const HomeType = use('App/Models/HomeType');

/**
 * Resourceful Home Types controller
 */
class HomeTypeController {

    async index({request, response}) {
        const homeTypes = await HomeType.getHomeTypes();
        return response.json(homeTypes);
    }

}

module.exports = HomeTypeController
