'use strict'

const PostVariable = use('App/Models/PostVariable')
const Post = use('App/Models/Post')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableRdController {
    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            await postVar.load('riesgo');
            const riesgo = await postVar.getRelated('riesgo')

            const rd = {
                risk_zone: riesgo ? riesgo.value : null,
                risk_type: riesgo ? riesgo.type : null
            };

            return response.json(rd);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            const riskZone = request.input("risk_zone");
            const riskType = request.input("risk_type");
            let tcResult = 0;
            let ecResult = 0;

            const variables = await postVariable.getRdRequiredData();
            variables.map(variable => {
                if (variable.points === null) {
                    throw new Error(`Debe completar primero la variable ${variable.title}`);
                }
                if (variable.cod == 'Ec') {
                    ecResult = variable.result;
                } else {
                    tcResult = variable.result;
                }
            });

            await postVariable.calculateRd(tcResult, ecResult, riskZone, riskType);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableRdController
