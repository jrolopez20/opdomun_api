'use strict'

const PostVariable = use('App/Models/PostVariable');

/**
 * Resourceful controller for interacting with posts
 */
class PostVariableController {

    async getPostVariables({request, response, params}) {
        const postVariables = await PostVariable
            .query()
            .with('variable')
            .where('postId', params.id)
            .fetch();

        return response.json(postVariables);
    }
}

module.exports = PostVariableController
