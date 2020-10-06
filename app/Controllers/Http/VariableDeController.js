'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')
const VarDisenoEstetica = use('App/Models/VarDisenoEstetica')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableDeController {

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            const varDe = await VarDisenoEstetica.findBy('postId', postVar.postId)

            const de = {
                valorArquitectonico: varDe ? varDe.valorArquitectonico : null,
                valorUrbano: varDe ? varDe.valorUrbano : null
            };

            return response.json(de);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const valorArquitectonico = request.input("valorArquitectonico");
            const valorUrbano = request.input("valorUrbano");

            const postVariable = await PostVariable.find(params.id);
            await postVariable.calculateDe(valorArquitectonico, valorUrbano);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableDeController
