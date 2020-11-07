'use strict'

const Plan = use('App/Models/Plan');

class OurServicesController {

    async index({response}) {
        const serices = await Plan.all();
        return response.json(serices);
    }

}

module.exports = OurServicesController
