'use strict'

const PostService = use('App/Services/PostService');
const Post = use('App/Models/Post');

class AppraisalController {

    async index({request, response, auth}) {
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provincia: request.input('provincia'),
            municipio: request.input('municipio'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            homeType: request.input('homeType')
        };
        const orderBy = request.input('orderBy');
        const posts = await Post.getAppraisals(page, limit, filter, orderBy, auth);
        return response.json(posts);
    }

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
