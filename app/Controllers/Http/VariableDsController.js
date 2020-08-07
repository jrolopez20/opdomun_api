'use strict'

const PostVariable = use('App/Models/PostVariable')

/**
 * Resourceful controller for interacting with posts
 */
class VariableDsController {

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            await postVar.load('servPublicos');
            const servPublicos = await postVar.getRelated('servPublicos').toJSON();
            const dicc = postVar.getDiccServiciosPublicos();
            const tc = {};

            servPublicos.map(item => {
                for(const service in dicc){
                    if(item.title === dicc[service].title){
                        tc[service] = dicc[service].options.find(o => o.label === item.display_value)
                    }
                }
            });

            return response.json(tc);
        } catch (e) {
            return response.status(404).json({message: e.message});
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            await postVariable.calculateDs(request);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableDsController
