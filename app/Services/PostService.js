'use strict'

const Post = use('App/Models/Post');
const Image = use('App/Models/Image');
const Variable = use('App/Models/Variable');
const PostVariable = use('App/Models/PostVariable');
const Database = use('Database');
const HisPost = use('App/Models/HisPost')
const PostPlace = use('App/Models/PostPlace')
const Owner = use('App/Models/Owner')
const NotificationService = use('App/Services/NotificationService')

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
        const activeMonths = request.input('active_months');
        const otherPlaces = request.input('other_places');

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

        if (post.plan) {
            // Define post close date
            await this.setExpirationDate(post.id, activeMonths);
        }

        await this.initPostVariable(post);
        await this.setAu(post, otherPlaces);

        post = await post.calculateOpdo();
        return post;
    }

    static async addFreePost(request, user) {
        const plan = 4;
        const activeMonths = 1;
        const otherPlaces = request.input('other_places');

        let post = new Post();
        post.plan = plan;
        post.municipio_id = request.input('municipio');
        post.address = request.input('address');
        post.price = request.input('price');
        post.area = request.input('area');
        post.bedrooms = request.input('bedrooms');
        post.bathrooms = request.input('bathrooms');
        post.home_type_id = request.input('home_type');
        post.summary = request.input('summary');
        post.published_at = new Date();

        await post.save();

        // Define post close date
        await this.setExpirationDate(post.id, activeMonths);

        const owner = await Owner.addOwner({
            postId: post.id,
            userId: user.id,
            fullname: request.input('fullname'),
            telephone: request.input('telephone'),
            email: request.input('email'),
        });

        await this.initPostVariable(post);
        await this.setAu(post, otherPlaces);

        post = await post.calculateOpdo();
        post.owner = owner;

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
        const inputOwner = request.input('owner');
        const otherPlaces = request.input('other_places');

        post.address = address;
        post.price = price;
        post.area = area;
        post.bedrooms = bedrooms;
        post.bathrooms = bathrooms;
        post.home_type_id = homeTypeId;
        post.summary = summary;
        post.sold = sold;

        await post.load('owner');
        const owner = await post.getRelated('owner');
        owner.fullname = inputOwner.fullname;
        owner.telephone = inputOwner.telephone;
        owner.email = inputOwner.email;
        await owner.save()

        await this.setAu(post, otherPlaces);

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

    static async setAu(post, otherPlaces) {
        await PostPlace
            .query()
            .where('post_id', post.id)
            .delete();

        await post
            .postPlaces()
            .createMany(otherPlaces);

        // Calcula automaticamente la variable Au
        await PostVariable.calculateAu(post.id, post.bedrooms, post.bathrooms, otherPlaces);
    }

    static async publishPost(postId) {
        let post = await Post.find(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        const hisPost = new HisPost();
        hisPost.post_id = postId;
        hisPost.action = 1;
        await hisPost.save();

        post.published_at = new Date();

        if (!post.plan) {
            // Case when is an appraisal
            post.plan = 1; // Set premium plan
            const activeMonths = 3;
            await this.setExpirationDate(post.id, activeMonths);
        }
        await post.save();

        const publishedPost = await Post.getPost(postId);
        const postObj = publishedPost.toJSON();

        // Notify owner about matched subscriptions
        await NotificationService.dispatchCustomerNotification(postObj);
        // Notify subscriptors about that match with the new property
        await NotificationService.dispatchSubscriptorNotification(postObj);

        return publishedPost;
    }

    static async setExpirationDate(postId, months) {
        await Database
            .raw(`UPDATE posts SET closed_at = (now() + interval '${months} month') WHERE id = ?`,
                [postId]);
    }

    static async calculatePrice(postId) {
        const post = await Post.find(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        if (!post.plan) {
            await post.calculatePrice();
        }

        return await Post.getPost(postId);
    }

    static async markAsSold(postId) {
        let post = await Post.find(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        post.sold = 1;
        await post.save();

        return await Post.getPost(postId);
    }

}

module.exports = PostService;
