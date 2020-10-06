'use strict'

const PostVariable = use('App/Models/PostVariable');
const VarConforEficiencia = use('App/Models/VarConforEficiencia');
const {validate} = use('Validator');
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableCfController {

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            const varConforEfic = await VarConforEficiencia.findBy('postId', postVar.postId)

            const cf = {
                windowCategory: varConforEfic ? varConforEfic.windowCategory : null,
                windowArea: varConforEfic ? varConforEfic.windowArea : null,
                puntal: varConforEfic ? varConforEfic.puntal : null,
                solarProtection: varConforEfic ? varConforEfic.solarProtection : null,
                eastProtection: varConforEfic ? varConforEfic.eastProtection : null,
                southProtection: varConforEfic ? varConforEfic.southProtection : null,
                westProtection: varConforEfic ? varConforEfic.westProtection : null
            };

            return response.json(cf);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const rules = {
                windowCategory: 'required|number',
                windowArea: 'required|number',
                puntal: 'required|number',
                solarProtection: 'required|number',
                eastProtection: 'number',
                southProtection: 'number',
                westProtection: 'number'
            };
            const {
                windowCategory, windowArea, puntal, solarProtection, eastProtection, southProtection, westProtection
            } = request.all();

            const validation = await validate(request.all(), rules);
            if (validation.fails()) {
                throw new Error('Existen campos incorrectos')
            } else {
                let postVariable = await PostVariable.find(params.id)

                let varConforEfic = await VarConforEficiencia.findBy('postId', postVariable.postId)
                if (!varConforEfic) {
                    varConforEfic = new VarConforEficiencia()
                    varConforEfic.postId = postVariable.postId;
                }

                varConforEfic.fill({
                    windowCategory, windowArea, puntal, solarProtection, eastProtection, southProtection, westProtection
                });

                await varConforEfic.save();

                await postVariable.calculateCf(windowCategory, windowArea, puntal, solarProtection, eastProtection, southProtection, westProtection);
                return response.json(postVariable);
            }
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableCfController
