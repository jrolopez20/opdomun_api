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
        const plan_id = request.input('plan_id');
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provincia_id: request.input('provincia_id'),
            municipio_id: request.input('municipio_id'),
            localidad_id: request.input('localidad_id'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            home_type_id: request.input('home_type_id'),
            my_posts: request.input('my_posts')
        };

        const result = await Post.getPosts(plan_id, page, limit, filter, auth.user);
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
    async PublishedPosts({request, response}) {
        const plan_id = request.input('plan_id');
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provincia_id: request.input('provincia_id'),
            municipio_id: request.input('municipio_id'),
            localidad_id: request.input('localidad_id'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            home_type_id: request.input('home_type_id')
        };

        const result = await Post.getPublishedPosts(plan_id, page, limit, filter);
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
                plan_id,
                address,
                price,
                area,
                bedrooms,
                bathrooms,
                home_type_id,
                summary,
                other_places,
                active_months
            } = request.all();

            const post = await PostService.addPost({
                plan_id,
                address,
                price,
                area,
                bedrooms,
                bathrooms,
                home_type_id,
                summary,
                other_places,
                active_months
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
    async show({params, request, response}) {
        try {
            const post = await Post.getPost(params.id);
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

    async addFreePost({request, response, auth}) {
        try {
            const {
                address, price, area, bedrooms, bathrooms, home_type_id, summary, other_places
            } = request.all();

            const post = await PostService.addFreePost({
                address, price, area, bedrooms, bathrooms, home_type_id, summary, other_places
            }, auth.user);

            return response.status(201).json(post)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = PostController
