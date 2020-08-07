'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')
const NomSegCiudadana = use('App/Models/NomSegCiudadana')

/**
 * Resourceful controller for interacting with posts
 */
class VariableScController {
    async getSeguridadCiudadanaValues({response}) {
        const items = await NomSegCiudadana.all()
        return response.json(items);
    }

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            const item = await NomSegCiudadana.findBy('value', postVar.result);

            const sc = {
                seg_cdna: item
            };

            return response.json(sc);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    async update({params, request, response}) {
        try {
            const segCdna = request.input("seg_cdna");

            const postVariable = await PostVariable.find(params.id)
            await postVariable.calculateSc(segCdna);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableScController
