'use strict'

const Subscription = use('App/Models/Subscription');

class SubscriptionService {

    static async destroySubscription(postId) {
        let subscription = await Subscription.find(postId);
        if (subscription) {
            return await subscription.delete();
        } else {
            throw new Error('Subscription not found');
        }
    }

}

module.exports = SubscriptionService;
