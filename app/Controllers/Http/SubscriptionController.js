'use strict'

const Subscription = use('App/Models/Subscription');
const SubscriptionService = use('App/Services/SubscriptionService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

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
        const filter = {
            provincia: request.input('provincia'),
            municipio: request.input('municipio'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            homeType: request.input('homeType')
        };

        const result = await Subscription.getSubscriptions(page, limit, filter);
        return result;
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Create/save a new subscription.
     * POST subscriptions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response, auth}) {
        try {
            const subscription = await SubscriptionService.addSubscription(request, auth.user);
            return response.status(201).json(subscription)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

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
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Update subscription details.
     * PUT or PATCH subscriptions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response, auth}) {
        try {
            const subscription = await SubscriptionService.setSubscription(params.id, request);
            return response.json(subscription);
        } catch (e) {
            throw new ResourceNotFoundException();
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
