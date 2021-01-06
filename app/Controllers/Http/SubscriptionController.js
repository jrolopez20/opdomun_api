'use strict'

const Event = use('Event')
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
     * @param auth
     * @returns {Promise<void>}
     */
    async index({request, response, auth}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provinciaId: request.input('provinciaId'),
            municipioId: request.input('municipioId'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            homeTypeId: request.input('homeTypeId')
        };

        const result = await Subscription.getSubscriptions(auth, page, limit, filter);
        return PaginatedResponse.parse(response, result)
    }

    async publishedSubscriptions({request, response, auth}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provinciaId: request.input('provinciaId'),
            municipioId: request.input('municipioId'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            homeTypeId: request.input('homeTypeId')
        };

        const result = await Subscription.getPublishedSubscriptions(page, limit, filter, auth);
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
            const {
                provincia, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms, owner
            } = request.all();

            const subscription = await SubscriptionService.addSubscription({
                provincia, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms, owner
            }, auth.user);

            Event.emit('new::subscription', {subscription})

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
