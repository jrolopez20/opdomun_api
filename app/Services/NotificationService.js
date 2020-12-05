'use strict'

const Post = use('App/Models/Post');
const Subscription = use('App/Models/Subscription');
const Notification = use('App/Models/Notification');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

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

    static async dispatchPostOwnerNotification(subscription) {
        const posts = await Post.getMatchedPosts(subscription);
        if (posts) {
            for (let post of posts) {
                // Check if user is agree with notification
                if (post.notificationsConsent) {
                    // TODO Send notification
                }
            }
        }
    }

    static async dispatchSubscripionOwnerNotification(post) {
        // Find all subscriptions that match to post's attribute
        const subscriptions = await Subscription.getMatchedSubscriptions({
            provinciaId: post.address.localidad.municipio.provinciaId,
            municipioId: post.address.localidad.municipioId,
            homeTypeId: post.homeTypeId,
            price: post.price.value,
        });

        if (subscriptions) {
            for (let subscription of subscriptions) {
                // Check if user is agree with notification
                if (subscription.user.notificationsConsent) {
                    // TODO Send notification
                }
            }
        }
    }

}

module.exports = NotificationService;
