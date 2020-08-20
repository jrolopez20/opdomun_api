'use strict'

const Validator = use('Validator');
const Database = use('Database');
const PostVariable = use('App/Models/PostVariable');

const postCompleteFn = async (data, field, message, args, get) => {
    const [postId] = args;
    const postVariables = await PostVariable
        .query()
        .with('variable')
        .where('post_id', postId)
        .fetch();

    for (let postVar of postVariables.toJSON()) {
        if (postVar.points === null) {
            throw message
        }
    }
}
Validator.extend('complete', postCompleteFn);

class PublishPost {

    get rules() {
        const postId = this.ctx.params.id;
        return {
            post_id: `complete:${postId}`
        }
    }

    get messages() {
        return {
            'post_id.complete': 'Debe completar todos los indicadores.'
        }
    }
}

module.exports = PublishPost;
