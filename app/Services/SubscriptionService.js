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

    static async addSubscription(request) {
        const subscription = new Subscription();
        subscription.provincia_id = request.input('provincia_id');
        subscription.min_price = request.input('min_price');
        subscription.max_price = request.input('max_price');
        subscription.bedrooms = request.input('bedrooms');
        subscription.bathrooms = request.input('bathrooms');
        subscription.telephone = request.input('telephone');
        subscription.fullname = request.input('fullname');
        subscription.email = request.input('email');
        subscription.municipio = request.input('municipio').join(',');
        subscription.home_type = request.input('home_type').join(',');

        await subscription.save();

        return subscription;
    }

}

module.exports = SubscriptionService;
