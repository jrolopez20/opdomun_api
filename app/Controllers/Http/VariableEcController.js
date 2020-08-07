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
            const post = await Post.find(postVar.post_id);

            const ec = {
                built_year: post.built_year,
                build_status: post.build_status,
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
                request.input('built_year'),
                request.input('build_status')
            );

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableEcController
