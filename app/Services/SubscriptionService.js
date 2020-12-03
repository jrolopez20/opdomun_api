'use strict'

const Database = use('Database');
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

    static async addSubscription({provincia, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms, owner}, user) {
        // Begin Transaction to save a Subscription
        const trx = await Database.beginTransaction()
        try {
            // Store subscription
            const subscription = new Subscription();
            subscription.userId = user.id;
            subscription.provinciaId = provincia.id;
            subscription.municipios = municipios;
            subscription.homeTypes = homeTypes;
            subscription.minPrice = minPrice;
            subscription.maxPrice = maxPrice;
            subscription.bedrooms = bedrooms;
            subscription.bathrooms = bathrooms;
            await subscription.save(trx);

            // Store owner
            await subscription.owner().create({
                fullname: owner.fullname,
                email: owner.email,
                telephone: owner.telephone,
                userId: user.id
            }, trx);

            // End transaction
            await trx.commit();

            return await Subscription.getSubscription(subscription.id);
        } catch (e) {
            trx.rollback();
            throw new Error(e.message)
        }
    }

    static async setSubscription(subscriptionId, request) {
        const {
            provincia, municipios, homeTypes, minPrice, maxPrice, bedrooms, bathrooms, owner
        } = request.all();

        const subscription = await Subscription.findOrFail(subscriptionId);

        subscription.provinciaId = provincia.id;
        subscription.municipios = municipios;
        subscription.homeTypes = homeTypes;
        subscription.minPrice = minPrice;
        subscription.maxPrice = maxPrice;
        subscription.bedrooms = bedrooms;
        subscription.bathrooms = bathrooms;

        await subscription.save();

        // Edit Owner
        if (owner) {
            await subscription.load('owner');
            const ownerObj = await subscription.getRelated('owner');
            ownerObj.fullname = owner.fullname;
            ownerObj.telephone = owner.telephone;
            ownerObj.email = owner.email;
            await ownerObj.save()
        }

        return await Subscription.getSubscription(subscriptionId);
    }

}

module.exports = SubscriptionService;
