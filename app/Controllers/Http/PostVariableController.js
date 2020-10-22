'use strict'

const PostVariable = use('App/Models/PostVariable');
const Database = use('Database')
/**
 * Resourceful controller for interacting with posts
 */
class PostVariableController {

    async getPostVariables({request, response, params}) {
        const variables = await PostVariable
            .query()
            .with('variable')
            .where('postId', params.id)
            .fetch();

        return response.json(variables);
    }
}

module.exports = PostVariableController
