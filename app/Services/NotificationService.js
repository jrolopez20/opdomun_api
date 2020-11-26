'use strict'

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
                provinciaId: post.municipio.provinciaId,
                municipioId: post.municipioId,
                price: post.price,
                homeType: post.homeTypeId
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
            provinciaId: post.address.localidad.municipio.provinciaId,
            municipioId: post.address.localidad.municipioId,
            price: post.price.value,
            homeType: post.homeTypeId
        });

        // for (const subscription of subscriptions) {
        //     await MailNotification.notifySubcriptor(subscription, post);
        // }
    }

}

module.exports = NotificationService;
