'use strict'

const Article = use('App/Models/Article');
const ArticleService = use('App/Services/ArticleService');
const PaginatedResponse = use('App/Util/PaginatedResponse');

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

        const result = await Article.getArticles(page, limit, filter);
        return PaginatedResponse.parse(response, result)
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
        const article = await Article.getArticle(params.id);
        return response.json(article);
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
        const article = await ArticleService.setArticle(params.id, request);
        return response.json(article);
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
        await ArticleService.destroyArticle(params.id);
        return response.status(204).json(null);
    }
}

module.exports = ArticleController
