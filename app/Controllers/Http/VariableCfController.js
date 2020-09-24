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
            const varConforEfic = await VarConforEficiencia.findBy('post_id', postVar.post_id)

            const cf = {
                window_category: varConforEfic ? varConforEfic.window_category : null,
                window_area: varConforEfic ? varConforEfic.window_area : null,
                puntal: varConforEfic ? varConforEfic.puntal : null,
                solar_protection: varConforEfic ? varConforEfic.solar_protection : null,
                east_protection: varConforEfic ? varConforEfic.east_protection : null,
                south_protection: varConforEfic ? varConforEfic.south_protection : null,
                west_protection: varConforEfic ? varConforEfic.west_protection : null
            };

            return response.json(cf);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const rules = {
                window_category: 'required|number',
                window_area: 'required|number',
                puntal: 'required|number',
                solar_protection: 'required|number',
                east_protection: 'number',
                south_protection: 'number',
                west_protection: 'number'
            };

            const validation = await validate(request.all(), rules);
            if (validation.fails()) {
                throw new Error('Existen campos incorrectos')
            } else {
                const windowCategory = request.input("window_category");
                const windowArea = request.input("window_area");
                const puntal = request.input("puntal");
                const solarProtection = request.input("solar_protection");
                const eastProtection = request.input("east_protection");
                const southProtection = request.input("south_protection");
                const westProtection = request.input("west_protection");

                let postVariable = await PostVariable.find(params.id)

                let varConforEfic = await VarConforEficiencia.findBy('post_id', postVariable.post_id)
                if (!varConforEfic) {
                    varConforEfic = new VarConforEficiencia()
                    varConforEfic.post_id = postVariable.post_id;
                }
                varConforEfic.window_category = windowCategory;
                varConforEfic.window_area = windowArea;
                varConforEfic.puntal = puntal;
                varConforEfic.solar_protection = solarProtection;
                varConforEfic.east_protection = eastProtection;
                varConforEfic.south_protection = southProtection;
                varConforEfic.west_protection = westProtection;

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
