'use strict'

const PostService = use('App/Services/PostService');
const Post = use('App/Models/Post');
const PaginatedResponse = use('App/Util/PaginatedResponse');

class AppraisalController {

    async index({request, response, auth}) {
        const plan_id = -1;
        const page = request.input('page');
        const limit = request.input('limit');
        const filter = {
            provincia_id: request.input('provincia_id'),
            municipio_id: request.input('municipio_id'),
            localidad_id: request.input('localidad_id'),
            minPrice: request.input('minPrice'),
            maxPrice: request.input('maxPrice'),
            bedrooms: request.input('bedrooms'),
            bathrooms: request.input('bathrooms'),
            home_type_id: request.input('home_type_id'),
            my_posts: request.input('my_posts')
        };

        const result = await Post.getPosts(plan_id, page, limit, filter, auth.user);
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
