'use strict'

const OneSignal = require('onesignal-node');
const Env = use('Env')
const Post = use('App/Models/Post');
const Plan = use('App/Models/Plan');
const Subscription = use('App/Models/Subscription');
const Notification = use('App/Models/Notification');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');
const BadRequestException = use('App/Exceptions/BadRequestException');

class NotificationService {

    static async setNotification(id, auth, {read}) {
        const notification = await Notification.findBy({
            id,
            userId: auth.user.id
        });

        if (!notification) {
            throw new ResourceNotFoundException();
        }

        notification.read = read;
        await notification.save();

        return await Notification.getNotification(id, auth);
    }

    static async destroyNotification(id, auth) {
        const notification = await Notification.findBy({
            id,
            userId: auth.user.id
        });

        if (!notification) {
            throw new ResourceNotFoundException();
        }

        await notification.delete();
    }

    static async notifySellers(subscription) {
        const posts = await Post.getMatchedPosts(subscription);
        if (posts) {
            for (let post of posts) {
                // Check if the user has accepted the notification consent
                if (post.notificationsConsent) {
                    const serviceName = post.plantType === Plan.TYPES().PREMIUM ? 'Premium' : 'Gratis'
                    // Create notification
                    const notification = new Notification()
                    notification.title = 'Comprador interesado'
                    notification.description = `${subscription.user.fullname} está interesado(a) en tu oferta de inmueble en venta publicado mediante el Servicio ${serviceName}`
                    notification.type = post.plantType === Plan.TYPES().PREMIUM
                        ? Notification.NOTIFICATION_TYPES().PURCHASE_TO_PREMIUM_SELLER
                        : Notification.NOTIFICATION_TYPES().PURCHASE_TO_FREE_SELLER
                    notification.user_id = post.userId
                    notification.resource = {id: post.id}
                    await notification.save();

                    const message = {
                        headings: {'es': notification.title},
                        contents: {'es': notification.description},
                        include_external_user_ids: [post.email],
                        data: {
                            id: notification.id, // Notification Id
                            type: notification.type, // Notification type
                            resource: {id: post.id}, // Resource Id
                        }
                    }
                    await NotificationService.dispatch(message)
                }
            }
        }
    }

    static async notifyBuyers(post) {
        // Find all subscriptions that match to post's attribute
        const subscriptions = await Subscription.getMatchedSubscriptions({
            provinciaId: post.address.localidad.municipio.provinciaId,
            municipioId: post.address.localidad.municipioId,
            homeTypeId: post.homeTypeId,
            price: post.price.value,
        });

        if (subscriptions) {
            for (let subscription of subscriptions) {
                // Check if the user has accepted the notification consent
                if (subscription.user.notificationsConsent) {
                    // TODO Send notification
                }
            }
        }
    }

    /**
     * Wrapper function to push notification
     * @param message
     * @returns {Promise<void>}
     */
    static async dispatch(message) {
        const client = new OneSignal.Client(Env.get('ONESIGNAL_APP_ID'), Env.get('ONESIGNAL_API_KEY'))
        try {
            const response = await client.createNotification(message);
        } catch (e) {
            if (e instanceof OneSignal.HTTPError) {
                throw new BadRequestException(e.body);
            }
        }

    }

}

module.exports = NotificationService;
