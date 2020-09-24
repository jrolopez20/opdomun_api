'use strict'
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

const PostVariable = use('App/Models/PostVariable')
const ColindanciaPrivacidad = use('App/Models/ColindanciaPrivacidad')

/**
 * Resourceful controller for interacting with posts
 */
class VariableCrController {

    async show({params, response}) {
        try {
            const postVariable = await PostVariable.find(params.id);
            const colindanciaPrivacidad = await postVariable.getCr();

            return response.json(colindanciaPrivacidad);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            const relHor = request.input("relHor");
            const relVert = request.input("relVert");
            const tipoVia = request.input("tipoVia");
            const alturaCercPer = request.input("alturaCercPer");
            const permeabilidad = request.input("permeabilidad") ? request.input("permeabilidad") : 'nohay';
            const altura = request.input("altura");
            const distancia = request.input("distancia");

            await postVariable.calculateCr(relHor, relVert, tipoVia, alturaCercPer, permeabilidad, altura, distancia);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableCrController
