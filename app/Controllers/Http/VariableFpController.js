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
            const varFlex = await VarFlexibilidad.findBy('postId', postVar.postId)

            const fp = {
                areaCrecimiento: varFlex ? varFlex.areaCrecimiento : null
            };

            return response.json(fp);
        } catch (e) {
            throw new ResourceNotFoundException();
        }
    }

    async update({params, request, response}) {
        try {
            const postVariable = await PostVariable.find(params.id)
            const areaCrecimiento = request.input("areaCrecimiento");

            let varFlex = await VarFlexibilidad.findBy('postId', postVariable.postId)
            if (!varFlex) {
                varFlex = new VarFlexibilidad()
                varFlex.postId = postVariable.postId;
            }
            varFlex.areaCrecimiento = areaCrecimiento;

            await varFlex.save();
            await postVariable.calculateFp(areaCrecimiento);

            return response.json(postVariable);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }
}

module.exports = VariableFpController
