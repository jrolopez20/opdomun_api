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
                    notification.user_id = post.owner.user.id
                    notification.resource = {id: post.id}
                    await notification.save();

                    const message = {
                        large_icon: post.owner.user.picture,
                        headings: {
                            'en': notification.title,
                            'es': notification.title
                        },
                        contents: {
                            'en': notification.description,
                            'es': notification.description
                        },
                        include_external_user_ids: [post.email],
                        data: {
                            id: notification.id,
                            type: notification.type,
                            resource: {id: post.id},
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
            price: post.price,
        });
        if (subscriptions) {
            for (let subscription of subscriptions) {
                // Check if the user has accepted the notification consent
                if (subscription.user.notificationsConsent) {
                    // Create notification
                    const notification = new Notification()
                    notification.title = 'Inmueble en venta'
                    notification.description = `${post.owner.fullname} vende un inmueble como el que usted está comprando. Revise los detalles de su oferta.`
                    notification.type = Notification.NOTIFICATION_TYPES().SALE_TO_BUYER
                    notification.user_id = subscription.user.id
                    notification.resource = {id: subscription.id}
                    await notification.save();

                    const message = {
                        large_icon: post.owner.user.picture,
                        headings: {
                            'en': notification.title,
                            'es': notification.title
                        },
                        contents: {
                            'en': notification.description,
                            'es': notification.description
                        },
                        include_external_user_ids: [subscription.user.email],
                        data: {
                            id: notification.id,
                            type: notification.type,
                            resource: {id: subscription.id},
                        }
                    }
                    await NotificationService.dispatch(message)
                }
            }
        }
    }

    static async notifyNumberOfVisits(post) {
        // Create notification
        const notification = new Notification()
        notification.title = 'Tu oferta es popular'
        notification.description = 'Tu oferta está siendo vista cada vez por más personas. Échale un vistazo al número de visitas que ha tenido hasta este momento.'
        notification.type = Notification.NOTIFICATION_TYPES().SALE_AD_VIEWS
        notification.user_id = post.owner.user.id
        notification.resource = {id: post.id}
        await notification.save();

        const message = {
            large_icon: post.owner.user.picture,
            headings: {
                'en': notification.title,
                'es': notification.title
            },
            contents: {
                'en': notification.description,
                'es': notification.description
            },
            include_external_user_ids: [post.owner.user.email],
            data: {
                id: notification.id,
                type: notification.type,
                resource: {id: post.id},
            }
        }
        await NotificationService.dispatch(message)
    }

    static async notifyPostPremiumOwner(post) {
        // Create notification
        const notification = new Notification()
        notification.title = 'Servicio Premium creado'
        notification.description = 'Ya está listo su Servicio Premium, a partir de ahora usted recibirá notificaciones con información de posibles compradores interesados en su propiedad.'
        notification.type = Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_CREATED
        notification.user_id = post.owner.user.id
        notification.resource = {id: post.id}
        await notification.save();

        const message = {
            large_icon: post.owner.user.picture,
            headings: {
                'en': notification.title,
                'es': notification.title
            },
            contents: {
                'en': notification.description,
                'es': notification.description
            },
            include_external_user_ids: [post.owner.user.email],
            data: {
                id: notification.id,
                type: notification.type,
                resource: {id: post.id},
            }
        }
        await NotificationService.dispatch(message)
    }

    static async notifyPostPremiumOwnerAboutOlderSubscription(post) {
        // Find all subscriptions that match to post's attribute
        const subscriptions = await Subscription.getMatchedSubscriptions({
            provinciaId: post.address.localidad.municipio.provinciaId,
            municipioId: post.address.localidad.municipioId,
            homeTypeId: post.homeTypeId,
            price: post.price,
        });
        if (subscriptions) {
            for (let subscription of subscriptions) {
                // Create notification
                const notification = new Notification()
                notification.title = 'Comprador interesado'
                notification.description = `${subscription.user.fullname} está interesado(a) en tu oferta de inmueble en venta publicado mediante el Servicio ${serviceName}`
                notification.type = post.plantType === Plan.TYPES().PREMIUM
                    ? Notification.NOTIFICATION_TYPES().PURCHASE_TO_PREMIUM_SELLER
                    : Notification.NOTIFICATION_TYPES().PURCHASE_TO_FREE_SELLER
                notification.user_id = post.owner.user.id
                notification.resource = {id: post.id}
                await notification.save();

                const message = {
                    large_icon: subscription.user.picture,
                    headings: {
                        'en': notification.title,
                        'es': notification.title
                    },
                    contents: {
                        'en': notification.description,
                        'es': notification.description
                    },
                    include_external_user_ids: [post.owner.user.email],
                    data: {
                        id: notification.id,
                        type: notification.type,
                        resource: {id: post.id},
                    }
                }
                await NotificationService.dispatch(message)
            }
        }
    }

    static async notifyExpiredPost() {
        const posts = (await Post.getExpiredPost()).toJSON()
        if (posts) {
            for (let post of posts) {
                // Check if the user has accepted the notification consent
                if (post.owner.user.notificationsConsent) {
                    const serviceName = post.plan.type === Plan.TYPES().PREMIUM ? 'Premium' : 'Gratis'
                    let description = ''
                    if (post.plan.type === Plan.TYPES().PREMIUM) {
                        description = 'Renueve su Servicio Premium cuanto antes para seguir obteniendo información de posibles compradores.'
                    } else {
                        description = 'Renueve su servicio convirtiéndolo a Premium! y aprobeche todas las ventajas que provee este servicio.'
                    }

                    // Create notification
                    const notification = new Notification()
                    notification.title = `Servicio ${serviceName} expirado`
                    notification.description = description
                    notification.type = post.plan.type === Plan.TYPES().PREMIUM
                        ? Notification.NOTIFICATION_TYPES().SALE_AD_PREMIUM_EXPIRED
                        : Notification.NOTIFICATION_TYPES().SALE_AD_FREE_EXPIRED
                    notification.user_id = post.owner.user.id
                    notification.resource = {id: post.id}
                    await notification.save();

                    const message = {
                        large_icon: post.owner.user.picture,
                        headings: {
                            'en': notification.title,
                            'es': notification.title
                        },
                        contents: {
                            'en': notification.description,
                            'es': notification.description
                        },
                        include_external_user_ids: [post.owner.user.email],
                        data: {
                            id: notification.id,
                            type: notification.type,
                            resource: {id: post.id},
                        }
                    }
                    console.log(message)
                    await NotificationService.dispatch(message)
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
            message.android_channel_id ='ac30d3c7-b234-4189-bb21-5b92ae4e49bf'
            await client.createNotification(message);
        } catch (e) {
            if (e instanceof OneSignal.HTTPError) {
                throw new BadRequestException(e.body);
            }
        }
    }

}

module.exports = NotificationService;
