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

    static async addSubscription(request) {
        const provinciaId = request.input('provincia_id');
        const municipios = request.input('municipio').join(',');
        const homeTypes = request.input('home_type').join(',');
        const minPrice = request.input('min_price');
        const maxPrice = request.input('max_price');

        const subscription = new Subscription();

        subscription.provincia_id = provinciaId;
        subscription.min_price = minPrice;
        subscription.max_price = maxPrice;
        subscription.bedrooms = request.input('bedrooms');
        subscription.bathrooms = request.input('bathrooms');
        subscription.telephone = request.input('telephone');
        subscription.fullname = request.input('fullname');
        subscription.email = request.input('email');
        subscription.municipio = municipios;
        subscription.home_type = homeTypes;

        await subscription.save();

        // Get all posts that match to subscription attribute
        const posts = await Post.getMatchedPremiumPost({
            provinciaId, municipios, minPrice, maxPrice, homeTypes
        });
        for (const post of posts) {
            // Notify owner about matched subscriptions
            await NotificationService.dispatchCustomerNotification({
                id: post.id,
                price: post.price,
                bedrooms: post.bedrooms,
                bathrooms: post.bathrooms,
                owner: {
                    fullname: post.fullname,
                    email: post.email,
                    phone: post.phone
                }
            }, subscription);
        }

        return subscription;
    }

}

module.exports = SubscriptionService;
