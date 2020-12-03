'use strict'

const Post = use('App/Models/Post');
const Subscription = use('App/Models/Subscription');
const MailNotification = use('App/Notifications/MailNotification');

class NotificationService {

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
