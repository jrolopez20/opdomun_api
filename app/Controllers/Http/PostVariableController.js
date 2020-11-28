'use strict'

const PostVariable = use('App/Models/PostVariable');
/**
 * Resourceful controller for interacting with posts
 */
class PostVariableController {

    async getPostVariables({request, response, params}) {
        const variables = await PostVariable
            .query()
            .with('variable')
            .where('postId', params.id)
            .orderBy('variableId')
            .fetch();

        return response.json(variables);
    }
}

module.exports = PostVariableController
