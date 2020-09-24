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
            const varDe = await VarDisenoEstetica.findBy('post_id', postVar.post_id)

            const de = {
                valor_arquitectonico: varDe ? varDe.valor_arquitectonico : null,
                valor_urbano: varDe ? varDe.valor_urbano : null
            };

            return response.json(de);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const valorArquitectonico = request.input("valor_arquitectonico");
            const valorUrbano = request.input("valor_urbano");

            const postVariable = await PostVariable.find(params.id);
            await postVariable.calculateDe(valorArquitectonico, valorUrbano);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableDeController
