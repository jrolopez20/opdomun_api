'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Image = use('App/Models/Image');
const ImageService = use('App/Services/ImageService');
const PaginatedResponse = use('App/Util/PaginatedResponse');
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
    /**
     * Show a list of all images.
     * GET images
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({params, request, response}) {
        const page = request.input('page');
        const limit = request.input('limit');

        const result = await Image.getImages(params.posts_id, page, limit);
        return PaginatedResponse.parse(response, result)
    }

    /**
     * Create/save a new image.
     * POST images
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({params, request, response}) {
        try {
            const postPictures = request.file('post_images', {
                types: ['image'],
                extnames: ['jpg', 'jpeg', 'png'],
                size: '1mb'
            });
            const images = await ImageService.addImages(params.posts_id, postPictures);
            return response.status(201).json(images)
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Display a single image.
     * GET images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({params, response}) {
        try {
            const image = await Image.getImage(params.posts_id, params.id);
            return response.json(image);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Update image details.
     * PUT or PATCH images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
        try {
            const image = await ImageService.toogleActiveImage(params.posts_id, params.id);
            return response.json(image);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

    /**
     * Delete a image with id.
     * DELETE images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, response}) {
        try {
            const res = await ImageService.destroyImage(params.posts_id, params.id);
            if (res) {
                return response.status(204).json(null);
            } else {
                return response.status(400).json('Image cannot be deleted');
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = ImageController
