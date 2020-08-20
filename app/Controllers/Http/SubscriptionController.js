'use strict'

const Subscription = use('App/Models/Subscription');
const SubscriptionService = use('App/Services/SubscriptionService');

/**
 * Resourceful controller for interacting with subscriptions
 */
class SubscriptionController {
    /**
     * Show a list of all subscriptions.
     * GET subscriptions
     *
     * @param request
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async index({request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = request.input('filter');
        const subscriptions = await Subscription.getSubscriptions(page, limit, filter);
        return response.json(subscriptions)
    }

    /**
     * Create/save a new subscription.
     * POST subscriptions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    // async store({request, response}) {
    //     try {
    //         const subscription = await SubscriptionService.addSubscription(request);
    //         return response.status(201).json(subscription)
    //     } catch (e) {
    //         return response.status(400).json({message: e.message})
    //     }
    // }

    /**
     * Display a single subscription.
     * GET subscriptions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, request, response}) {
        try {
            const subscription = await Subscription.getSubscription(params.id);
            return response.json(subscription)
        } catch (e) {
            return response.status(404).json({message: 'Subscription not found'})
        }
    }

    /**
     * Delete a subscription with id.
     * DELETE subscriptions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        try {
            const res = await SubscriptionService.destroySubscription(params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Cannot delete subscription');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

}

module.exports = SubscriptionController
