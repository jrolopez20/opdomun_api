'use strict'

const Post = use('App/Models/Post');
const Image = use('App/Models/Image');
const Variable = use('App/Models/Variable');
const PostVariable = use('App/Models/PostVariable');
const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');

class PostService {

    static async addPost(request, authorId) {
        const plan = request.input('plan');
        const municipio = request.input('municipio_id');
        const address = request.input('address');
        const price = request.input('price');
        const area = request.input('area');
        const bedrooms = request.input('bedrooms');
        const bathrooms = request.input('bathrooms');
        const homeTypeId = request.input('home_type_id');
        const summary = request.input('summary');

        let post = new Post();
        post.user_id = authorId;
        post.plan = plan;
        post.municipio_id = municipio;
        post.address = address;
        post.price = price;
        post.area = area;
        post.bedrooms = bedrooms;
        post.bathrooms = bathrooms;
        post.home_type_id = homeTypeId;
        post.summary = summary;

        await post.save();

        await this.initPostVariable(post);

        post = await post.calculateOpdo();
        return post;
    }

    static async setPost(postId, request) {
        let post = await Post.find(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        const address = request.input('address');
        const price = request.input('price');
        const area = request.input('area');
        const bedrooms = request.input('bedrooms');
        const bathrooms = request.input('bathrooms');
        const homeTypeId = request.input('home_type_id');
        const summary = request.input('summary');
        const sold = request.input('sold');

        post.address = address;
        post.price = price;
        post.area = area;
        post.bedrooms = bedrooms;
        post.bathrooms = bathrooms;
        post.home_type_id = homeTypeId;
        post.summary = summary;
        post.sold = sold;

        post = await post.calculateOpdo();
        return post;
    }

    static async destroyPost(postId) {
        let post = await Post.find(postId);
        if (post) {
            await Image.removeAllImgOnDrive(post.id);
            return await post.delete();
        } else {
            throw new Error('Post not found');
        }
    }

    static async initPostVariable(post) {
        let variables = await Variable.getVariables();
        variables = variables.toJSON();
        let postVariables = new Array();

        for (let variable of variables) {
            postVariables.push({
                variable_id: variable.id
            });
        }

        await post
            .postVariables()
            .createMany(postVariables);

        // Calcula automaticamente la variable Pu
        await PostVariable.calculatePu(post.id, post.municipio_id)
    }

}

module.exports = PostService;
