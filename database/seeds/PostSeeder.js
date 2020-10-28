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
        for (const user of clients.toJSON()) {
            const post = await Factory.model('App/Models/Post').make()
            await PostService.addFreePost(post.toJSON(), {user});
        }

        // Create PREMIUM dummy posts and Appraisals
        const agents = await User.query().where('role', User.roles().AGENT).fetch();
        const premiumPlan = await Plan.findBy('type', Plan.TYPES().PREMIUM)
        for (const agent of agents.toJSON()) {
            let post = await Factory.model('App/Models/Post').make({plan: premiumPlan})
            post.activeMonths = 3;
            post = await PostService.addPost(post.toJSON(), {user: agent});
            await PostService.publishPost(post.id)

            const appraisalObj = await Factory.model('App/Models/Post').make()
            const appraisal = appraisalObj.toJSON()
            delete appraisal.images
            await PostService.addPost(appraisal, {user: agent});
        }
    }
}

module.exports = PostSeeder
