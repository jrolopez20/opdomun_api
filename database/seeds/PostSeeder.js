'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Address = use('App/Models/Address')
const Plan = use('App/Models/Plan')
const PostService = use('App/Services/PostService')

class PostSeeder {
    async run() {
        await Address.query().delete();
        // Create FREE dummy posts
        let clients = await User.query().where('role', User.roles().CLIENT).fetch();
        for (const client of clients.toJSON()) {
            const post = await Factory.model('App/Models/Post').make()
            await PostService.addFreePost(post.toJSON(), client);
        }

        // Create PREMIUM dummy posts
        const agents = await User.query().where('role', User.roles().AGENT).fetch();
        const premiumPlan = await Plan.findBy('type', Plan.TYPES().PREMIUM)
        for (const agent of agents.toJSON()) {
            const obj = await Factory.model('App/Models/Post').make({planId: premiumPlan.id})
            obj.activeMonths = 3;
            const post = await PostService.addPost(obj.toJSON(), agent);
            await PostService.publishPost(post.id)
        }
    }
}

module.exports = PostSeeder
