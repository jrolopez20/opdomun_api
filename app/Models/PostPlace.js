'use strict'

const Model = use('Model')

class PostPlace extends Model {

    static get hidden() {
        return ['postId', 'createdAt', 'updatedAt'];
    }

    static async getPostPLaces(id) {
        const postPlaces = await PostPlace
            .query()
            .setVisible(['id', 'title'])
            .where('postId', id)
            .fetch()
        return postPlaces;
    }

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }
}

module.exports = PostPlace
