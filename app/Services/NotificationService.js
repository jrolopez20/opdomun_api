'use strict'

const Post = use('App/Models/Post');
const Subscription = use('App/Models/Subscription');
const MailNotification = use('App/Notifications/MailNotification');

class NotificationService {

    static async dispatchCustomerNotification() {
        // Get all active premium post
        const posts = await Post.getActivePremiumPost();
        for (const post of posts) {
            // For each post find all subscriptions that match to its attribute
            const subscriptors = await Subscription.getMatchedSubscriptions({
                provinciaId: post.provincia_id,
                municipioId: post.municipio_id,
                price: post.price,
                homeType: post.home_type_id
            });
            // Finally if there is at least one subcription matched to the post attributes dispatch email
            if(subscriptors.length) {
                await MailNotification.sendCustomerEmail({
                    email: post.email,
                    fullname: post.fullname
                }, subscriptors);

                break; // TODO, delete this line. It's created only for testing purpose
            }
        }
        return true;
    }

    static async dispatchSubscriptorNotification() {
    }

}

module.exports = NotificationService;
