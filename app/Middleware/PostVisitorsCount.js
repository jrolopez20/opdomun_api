'use strict'

const Event = use('Event')
const PostVisit = use('App/Models/PostVisit')
const Post = use('App/Models/Post')
const Plan = use('App/Models/Plan')

class PostVisitorsCount {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({params, response, auth}, next) {
        let post = await Post.getPost(params.id, auth)
        if (post && post.publishedAt) {
            await PostVisit.inrementVisit(params.id);

            if (post.plan.type === Plan.TYPES().PREMIUM) {
                post = await Post.getPost(params.id, auth)
                Event.emit('visitor::post', {post})
            }
        }
        // call next to advance the request
        await next()
    }
}

module.exports = PostVisitorsCount;
