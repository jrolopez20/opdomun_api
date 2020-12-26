'use strict'

const Notification = use('App/Models/Notification');
const NotificationService = use('App/Services/NotificationService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
    /**
     * Show a list of all notifications.
     * GET notifications
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({request, response, view, auth}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const result = await Notification.getNotifications(page, limit, auth);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Display a single notification.
     * GET notifications/:id
     *
     * @param params
     * @param response
     * @param auth
     * @returns {Promise<*|Promise<any>>}
     */
    async show({params, response, auth}) {
        try {
            const notification = await Notification.getNotification(params.id, auth)
            return response.json(notification)
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Update notification details.
     * PUT or PATCH notifications/:id
     *
     * @param params
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<void>}
     */
    async update({params, request, response, auth}) {
        try {
            const read = request.input('read');
            const office = await NotificationService.setNotification(params.id, auth, {read});

            return response.json(office);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Delete a notification with id.
     * DELETE notifications/:id
     *
     * @param params
     * @param response
     * @param auth
     * @returns {Promise<*|Promise<any>>}
     */
    async destroy({params, response, auth}) {
        try {
            await NotificationService.destroyNotification(params.id, auth);

            return response.status(204).json(null);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Return total of unread notifications.
     * GET notifications/count
     *
     * @param response
     * @param auth
     * @returns {Promise<*|Promise<any>>}
     */
    async unreadCount({response, auth}) {
        const count = await Notification.getUnreadCount(auth)
        return response.json(count)
    }
}

module.exports = NotificationController
