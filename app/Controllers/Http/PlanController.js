'use strict'

const Plan = use('App/Models/Plan');

/**
 * Resourceful Plans controller
 */
class PlanController {

    async index({response}) {
        const plans = await Plan.all();
        return response.json(plans);
    }

}

module.exports = PlanController
