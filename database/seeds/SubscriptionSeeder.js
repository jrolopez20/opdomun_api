'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Subscription = use('App/Models/Subscription')
const SubscriptionService = use('App/Services/SubscriptionService');
const User = use('App/Models/User')

class SubscriptionSeeder {

    async run() {
        // Remove existing subscriptions
        await Subscription.query().delete();

        let clients = await User.query().where('role', User.roles().CLIENT).limit(5).fetch();
        for (const user of clients.toJSON()) {
            const subscription = await Factory.model('App/Models/Subscription').make()
            const subscriptionObject = subscription.toJSON();
            await SubscriptionService.addSubscription({
                ...subscriptionObject,
                provincia: {id: subscriptionObject.provinciaId},
                municipios: JSON.parse(subscription.municipios),
                homeTypes: JSON.parse(subscription.homeTypes)
            }, user);
        }
    }
}

module.exports = SubscriptionSeeder;
