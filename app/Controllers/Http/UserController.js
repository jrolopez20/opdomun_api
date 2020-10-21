'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');
const UserService = use('App/Services/UserService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

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
        const role = request.input('role');
        const orderBy = request.input('orderBy');

        const result = await User.getUsers(page, limit, filter, role, orderBy);
        return PaginatedResponse.parse(response, result)
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
            throw new ResourceNotFoundException();
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
    async destroy({params, response, auth}) {
        try {
            const res = await UserService.destroyUser(params.id, auth);
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

    async toggleEnable({params, response}) {
        try {
            const user = await UserService.toggleEnable(params.id);
            return response.json(user);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async roles({response, auth}) {
        const roles = await UserService.getRoles(auth.user);
        return response.json(roles)
    }

    async getAuthenticatedUser({response, auth}) {
        const user = await User.getUser(auth.user.id);
        return response.json(user)
    }
}

module.exports = UserController
