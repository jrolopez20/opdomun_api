'use strict'

const Post = use('App/Models/Post');
const Subscription = use('App/Models/Subscription');
const MailNotification = use('App/Notifications/MailNotification');

class NotificationService {

    static async dispatchCustomerNotification(post, subscription = null) {
        if (!post.owner.email) {
            return false;
        }

        if (subscription) {
            await MailNotification.notifyCustomerSingle(post.owner, subscription);
            return true;
        } else {
            // Find all subscriptions that match to post's attribute
            const subscriptors = await Subscription.getMatchedSubscriptions({
                provinciaId: post.municipio.provincia_id,
                municipioId: post.municipio_id,
                price: post.price,
                homeType: post.home_type_id
            });

            // Finally if there is at least one subcription matched to the post attributes dispatch email
            if (subscriptors.length > 1) {
                await MailNotification.notifyCustomerMultiple(post.owner, subscriptors);
                return true;
            }
        }
        return false;
    }

    static async dispatchSubscriptorNotification(post) {
        // Find all subscriptions that match to post's attribute
        const subscriptions = await Subscription.getMatchedSubscriptions({
            provinciaId: post.municipio.provincia_id,
            municipioId: post.municipio_id,
            price: post.price,
            homeType: post.home_type_id
        });

        for (const subscription of subscriptions) {
            await MailNotification.notifySubcriptor(subscription, post);
        }
    }

}

module.exports = NotificationService;
