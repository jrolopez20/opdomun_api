'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post');
const PostService = use('App/Services/PostService');

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
    /**
     * Show a list of all posts.
     * GET posts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({request, response}) {
        const plan = request.input('plan');
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provincia: request.input('provincia'),
            municipio: request.input('municipio'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            homeType: request.input('homeType')
        };
        const orderBy = request.input('orderBy');
        const posts = await Post.getPosts(plan, page, limit, filter, orderBy);
        return response.json(posts);
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
            const post = await PostService.addPost(request, auth.user.id);
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
    async show({params, request, response}) {
        try {
            const post = await Post.getPost(params.id);
            return response.json(post);
        } catch (e) {
            return response.status(404).json({message: e.message});
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

    async getFeaturedPosts({request, response}) {
        try {
            const page = request.input('page');
            const limit = request.input('limit');
            const posts = await Post.getFeaturedPosts(page, limit);
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
        try {
            const post = await PostService.markAsSold(params.id);
            return response.json(post);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    async addFreePost({request, response}) {
        try {
            const post = await PostService.addFreePost(request);
            return response.status(201).json(post)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = PostController
