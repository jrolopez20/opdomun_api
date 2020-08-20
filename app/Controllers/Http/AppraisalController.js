'use strict'

const PostService = use('App/Services/PostService');

class AppraisalController {

    async calculatePrice({params, response}) {
        try {
            const post = await PostService.calculatePrice(params.id);
            return response.json(post);
        } catch (e) {
            return response.status(400).json({message: e.message})
        }
    }

}

module.exports = AppraisalController;
