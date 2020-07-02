'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const Article = use('App/Models/Article');
const ArticleService = use('App/Services/ArticleService');

/**
 * Resourceful controller for interacting with articles
 */
class ArticleController {
    /**
     * Show a list of all articles.
     * GET articles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = request.input('filter');
        const articles = await Article.getArticles(page, limit, filter);
        return response.json(articles);
    }

    /**
     * Create/save a new article.
     * POST articles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response, auth}) {
        try {
            const article = await ArticleService.addArticle(request, auth.user.id);
            return response.status(201).json(article)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Display a single article.
     * GET articles/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async show({params, response}) {
        try {
            const article = await Article.getArticle(params.id);
            return response.json(article);
        } catch (e) {
            return response.status(404).json({message: 'Article not found'});
        }
    }

    /**
     * Update article details.
     * PUT or PATCH articles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        try {
            const article = await ArticleService.setArticle(params.id, request);
            return response.json(article);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Delete a article with id.
     * DELETE articles/:id
     *
     * @param params
     * @param response
     * @returns {Promise<*|Promise<any>>}
     */
    async destroy({params, response}) {
        try {
            const res = await ArticleService.destroyArticle(params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Cannot delete user');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = ArticleController
