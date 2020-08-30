'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PostVisit = use('App/Models/PostVisit')
const Post = use('App/Models/Post')

class PostVisitorsCount {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({params, response, session}, next) {
        try {
            const post = await Post.find(params.id)
            if (post && post.published_at) {
                await PostVisit.inrementVisit(params.id);
            }
            // call next to advance the request
            await next()
        } catch (e) {
            // session.withErrors({'error': 'Error interno del sistema, contacte al administrador.'});
            session.withErrors({'error': e.message});
            return response.redirect('/not-found')
        }

    }
}

module.exports = PostVisitorsCount;
