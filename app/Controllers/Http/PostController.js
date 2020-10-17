'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post');
const PostService = use('App/Services/PostService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
    /**
     * Show a list of all posts base on the authenticaded user.
     * GET posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response, auth}) {
        const {
            planId, page, limit, provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId, myPosts
        } = request.all();

        const filter = {
            provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId, myPosts
        };

        const result = await Post.getPosts(planId, page, limit, filter, auth.user);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Show a list of all published posts.
     * GET posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async publishedPosts({request, response, auth}) {
        const {
            planId, page, limit, provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId
        } = request.all();

        const filter = {
            provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId
        };

        const result = await Post.getPublishedPosts(planId, page, limit, filter, auth);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Create/save a new post.
     * POST posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response, auth}) {
        try {
            const {
                planId,
                address,
                price,
                area,
                bedrooms,
                bathrooms,
                homeTypeId,
                summary,
                otherPlaces,
                activeMonths
            } = request.all();

            const post = await PostService.addPost({
                planId,
                address,
                price,
                area,
                bedrooms,
                bathrooms,
                homeTypeId,
                summary,
                otherPlaces,
                activeMonths
            }, auth.user);

            return response.status(201).json(post)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Display a single post.
     * GET posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, request, response, auth}) {
        try {
            const post = await Post.getPost(params.id, auth);
            return response.json(post);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Update post details.
     * PUT or PATCH posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response, auth}) {
        try {
            const post = await PostService.setPost(params.id, request);
            return response.json(post);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Delete a post with id.
     * DELETE posts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        try {
            const res = await PostService.destroyPost(params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Cannot delete post');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async getFeaturedPosts({request, response, auth}) {
        try {
            const page = request.input('page');
            const limit = request.input('limit');
            const posts = await Post.getFeaturedPosts(page, limit, auth);
            return response.json(posts);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async getRecommendedPosts({request, response}) {
        try {
            const limit = request.input('limit');
            const posts = await Post.getRecommendedPost(limit);
            return response.json(posts);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async publishPost({params, response}) {
        try {
            const post = await PostService.publishPost(params.id);
            return response.json(post);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async markAsSold({params, response}) {
        const post = await PostService.markAsSold(params.id);
        return response.json(post);
    }

    async addFreePost({request, response, auth}) {
        try {
            const {
                address, price, area, bedrooms, bathrooms, homeTypeId, summary, otherPlaces
            } = request.all();

            const post = await PostService.addFreePost({
                address, price, area, bedrooms, bathrooms, homeTypeId, summary, otherPlaces
            }, auth);

            return response.status(201).json(post)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = PostController
