'use strict'

const Owner = use('App/Models/Owner');

/**
 * Resourceful controller for interacting with owners
 */
class OwnerController {
    //TODO Owner for Post
    /**
     * Show a list of all owners.
     * GET owners
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response}) {
    }

    /**
     * Create/save a new owner.
     * POST owners
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response, params}) {
        try {
            const owner = await Owner.addOwner({
                postId: params.postId,
                fullname: request.input('fullname'),
                phone: request.input('phone'),
                email: request.input('email'),
            });

            return response.status(201).json(owner)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Display a single owner.
     * GET owners/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, request, response}) {
        try {
            const owner = await Owner.find(params.id);
            return response.json(owner);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    /**
     * Update owner details.
     * PUT or PATCH owners/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        try {
            const owner = await Owner.find(params.id);
            owner.fullname = request.input('fullname');
            owner.phone = request.input('phone');
            owner.email = request.input('email');
            await owner.save();

            return response.status(201).json(owner)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

}

module.exports = OwnerController
