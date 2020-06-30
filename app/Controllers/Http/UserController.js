'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');
const UserService = use('App/Services/UserService');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
    /**
     * Show a list of all users.
     * GET users
     *
     * @param request
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async index({request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = request.input('filter');
        const users = await User.getUsers(page, limit, filter);
        return response.json(users)
    }

    /**
     * Create/save a new user.
     * POST users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response}) {
        try {
            const user = await UserService.addUser(request);
            return response.status(201).json(user)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Display a single user.
     * GET users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, request, response}) {
        try {
            const user = await User.getUser(params.id);
            return response.json(user)
        } catch (e) {
            return response.status(404).json({message: 'User not found'})
        }
    }

    /**
     * Update user details.
     * PUT or PATCH users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        try {
            const user = await UserService.setUser(params.id, request);
            return response.json(user);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Delete a user with id.
     * DELETE users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        try {
            const res = await UserService.destroyUser(params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Cannot delete user');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async changePassword({params, request, response, auth}) {
        try {
            await UserService.changePassword(params.id, request.input('password'));
            return response.json('Password changed');
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = UserController
