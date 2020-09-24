'use strict'

const PostVariable = use('App/Models/PostVariable')
const VarFlexibilidad = use('App/Models/VarFlexibilidad')
const ResourceNotFoundException = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with posts
 */
class VariableFpController {

    async show({params, response}) {
        try {
            const postVar = await PostVariable.find(params.id);
            const varFlex = await VarFlexibilidad.findBy('post_id', postVar.post_id)

            const fp = {
                area_crecimiento: varFlex ? varFlex.area_crecimiento : null
            };

            return response.json(fp);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            const areaCrecimiento = request.input("area_crecimiento");

            let varFlex = await VarFlexibilidad.findBy('post_id', postVariable.post_id)
            if (!varFlex) {
                varFlex = new VarFlexibilidad()
                varFlex.post_id = postVariable.post_id;
            }
            varFlex.area_crecimiento = areaCrecimiento;

            await varFlex.save();
            await postVariable.calculateFp(areaCrecimiento);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableFpController
