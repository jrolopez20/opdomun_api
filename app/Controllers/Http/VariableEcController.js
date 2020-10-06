'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class VariableEcController {

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            const post = await Post.find(postVar.postId);

            const ec = {
                builtYear: post.builtYear,
                buildStatus: post.buildStatus,
            };

            return response.json(ec);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            await postVariable.calculateEc(
                request.input('builtYear'),
                request.input('buildStatus')
            );

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableEcController
