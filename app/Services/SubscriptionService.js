'use strict'

const Subscription = use('App/Models/Subscription');
const Post = use('App/Models/Post');
const NotificationService = use('App/Services/NotificationService')

class SubscriptionService {

    static async destroySubscription(postId) {
        let subscription = await Subscription.find(postId);
        if (subscription) {
            return await subscription.delete();
        } else {
            throw new Error('Subscription not found');
        }
    }

    static async addSubscription({provinciaId, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms}, user) {
        const subscription = new Subscription();

        subscription.userId = user.id;
        subscription.provinciaId = provinciaId;
        subscription.municipios = municipios;
        subscription.homeTypes = homeTypes;
        subscription.minPrice = minPrice;
        subscription.maxPrice = maxPrice;
        subscription.bedrooms = bedrooms;
        subscription.bathrooms = bathrooms;

        await subscription.save();

        // // Get all posts that match to subscription attribute
        // const posts = await Post.getMatchedPremiumPost({
        //     provinciaId, municipios, minPrice, maxPrice, homeTypes
        // });
        // for (const post of posts) {
        //     // Notify owner about matched subscriptions
        //     await NotificationService.dispatchCustomerNotification({
        //         id: post.id,
        //         price: post.price,
        //         bedrooms: post.bedrooms,
        //         bathrooms: post.bathrooms,
        //         owner: {
        //             fullname: post.fullname,
        //             email: post.email,
        //             telephone: post.telephone
        //         }
        //     }, subscription);
        // }

        return await Subscription.find(subscription.id);
    }

    static async setSubscription(subscriptionId, request) {
        const {
            provinciaId, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms
        } = request.all();

        const subscription = await Subscription.findOrFail(subscriptionId);

        subscription.provinciaId = provinciaId;
        subscription.municipios = municipios;
        subscription.homeTypes = homeTypes;
        subscription.minPrice = minPrice;
        subscription.maxPrice = maxPrice;
        subscription.bedrooms = bedrooms;
        subscription.bathrooms = bathrooms;

        await subscription.save();

        return await Subscription.find(subscriptionId);
    }

}

module.exports = SubscriptionService;
