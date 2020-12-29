'use strict'

const Model = use('Model')
const Database = use('Database')
const moment = require('moment')

class Notification extends Model {
    static NOTIFICATION_TYPES() {
        return {
            SALE_TO_BUYER: 'SALE_TO_BUYER', //Notificación que se le envía a un comprador, indicándole un anuncio de venta que coincide con alguno de sus anuncios de compra
            PURCHASE_TO_PREMIUM_SELLER: 'PURCHASE_TO_PREMIUM_SELLER', //Notificación que se le envía a un vendedor con anuncio preimum, indicándole de un anuncio de compra que coincide con alguno de sus anuncios de venta
            PURCHASE_TO_FREE_SELLER: 'PURCHASE_TO_FREE_SELLER', //Notificación que se le envía a un vendedor con anuncio gratis, indicándole de un anuncio de compra que coincide con alguno de sus anuncios de venta
            SALE_AD_PREMIUM_EXPIRED: 'SALE_AD_PREMIUM_EXPIRED', //Notificación que se le envía a un vendedor de anuncio premium, indicándole que su anuncio de venta premium debe ser renovado
            SALE_AD_FREE_EXPIRED: 'SALE_AD_FREE_EXPIRED', //Notificación que se le envía a un vendedor de anuncio gratis, indicándole que su anuncio de venta gratis debe ser renovado,
            SALE_AD_VIEWS: 'SALE_AD_VIEWS', //Notificación que se le envía a un vendedor con anuncio premium, indicándole la cantidad de visitas que ha tenido su anuncio de venta
            SALE_AD_PREMIUM_CREATED: 'SALE_AD_PREMIUM_CREATED', //Notificación que se le envía a un vendedor, indicándole que su anuncio de venta premium ya está disponible
        }
    }

    static get hidden() {
        return ['userId', 'updatedAt'];
    }

    static get computed () {
        return ['expired']
    }

    getExpired ({ closedAt }) {
        const now = moment();
        return closedAt && moment(closedAt).isBefore(now) ?  true : false
    }

    setResource(resource) {
        return JSON.stringify(resource)
    }

    setClient(client) {
        return JSON.stringify(client)
    }

    static async getNotifications(page, limit, auth) {
        const query = Notification
            .query()
            .with('user')
            .orderBy('read', 'DESC')
            .orderBy('createdAt', 'DESC')


        if (auth) {
            query.where('userId', auth.user.id)
        }

        const notifications = await query.paginate(page, limit);
        return notifications.toJSON();
    }

    static async getUnreadCount(auth) {
        const result = await Database
            .count('id as total')
            .from('notifications')
            .where('user_id', auth.user.id)
            .where('read', false)
            .first()

        return result.total;
    }

    static async getNotification(id, auth) {
        const query = Notification
            .query()
            .with('user')
            .where('id', id)
            .where('userId', auth.user.id)
            .firstOrFail();

        return await query;
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id');
    }
}

module.exports = Notification
