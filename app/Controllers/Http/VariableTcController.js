'use strict'

const PostVariable = use('App/Models/PostVariable')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableTcController {

    async getSolTecnicoConstructivaValues({response}) {
        const postVariable = new PostVariable();
        return response.json(postVariable.getSolTecnicoConstructiva());
    }

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            await postVar.load('estConstructivas');
            const estConstructivas = await postVar.getRelated('estConstructivas').toJSON();
            const dicc = postVar.getSolTecnicoConstructiva();
            const tc = {};

            estConstructivas.map(item => {
                const labels = item.display_value.split(', ');
                const key = this.removeAccent(item.title.toLowerCase());
                tc[key] = dicc[key].filter(obj => labels.find(label => label === obj.label ));
            });

            return response.json(tc);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    removeAccent (str = '') {
        str = str.replace('í', 'i');
        str = str.replace('ó', 'o');
        return str;
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)

            const carpinteria = request.input("carpinteria");
            const cubierta = request.input("cubierta");
            const enchape = request.input("enchape");
            const instalacion = request.input("instalacion");
            const muros = request.input("muros");
            const piso = request.input("piso");


            await postVariable.calculateTc(carpinteria, cubierta, enchape, instalacion, muros, piso);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableTcController
