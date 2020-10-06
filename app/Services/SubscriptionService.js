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

    static async addSubscription(request, user) {
        const {
            provinciaId, municipio, homeType, minPrice, maxPrice, bedrooms, bathrooms, telephone, fullname, email
        } = request.all();

        const subscription = new Subscription();

        subscription.userId = user.id;
        subscription.provinciaId = provinciaId;
        subscription.municipio = municipio.join(',');
        subscription.homeType = homeType.join(',');
        subscription.minPrice = minPrice;
        subscription.maxPrice = maxPrice;
        subscription.bedrooms = bedrooms;
        subscription.bathrooms = bathrooms;
        subscription.telephone = telephone;
        subscription.fullname = fullname;
        subscription.email = email;

        await subscription.save();

        // Get all posts that match to subscription attribute
        const posts = await Post.getMatchedPremiumPost({
            provinciaId, municipio, minPrice, maxPrice, homeType
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
                    telephone: post.telephone
                }
            }, subscription);
        }

        return subscription;
    }

}

module.exports = SubscriptionService;
