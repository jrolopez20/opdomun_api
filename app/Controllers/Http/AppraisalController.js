'use strict'

const PostService = use('App/Services/PostService');
const Post = use('App/Models/Post');
const PaginatedResponse = use('App/Util/PaginatedResponse');

class AppraisalController {

    async index({request, response, auth}) {
        let {
            page, limit, provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId, myPosts
        } = request.all();
        const planId = -1;
        const filter = {
            provinciaId, municipioId, localidadId, minPrice, maxPrice, bedrooms, bathrooms, homeTypeId, myPosts
        };

        const result = await Post.getPosts(planId, page, limit, filter, auth.user);
        return PaginatedResponse.parse(response, result)
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
