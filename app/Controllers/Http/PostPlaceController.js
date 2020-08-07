'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

const PostVariable = use('App/Models/PostVariable');

/**
 * Resourceful controller for interacting with posts
 */
class PostPlaceController {

    async getOtherPlaces({request, response}) {
        const places = await PostVariable.getDiccAreaUtil();
        return response.json(places);
    }
}

module.exports = PostPlaceController
