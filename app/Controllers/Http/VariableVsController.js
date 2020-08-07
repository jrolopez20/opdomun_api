'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class VariableEcController {

    async show({params, response}) {
        try {
            const postVariable = await PostVariable.find(params.id);
            const vs = await postVariable.getVisualesValues();

            return response.json(vs);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    async update({params, request, response}) {
        try {
            const visuales = request.input("visuales");
            let postVariable = await PostVariable.find(params.id);
            await postVariable.calculateVs(visuales);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message});
        }
    }
}

module.exports = VariableEcController
