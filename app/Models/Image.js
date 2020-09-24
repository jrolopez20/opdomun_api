'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Helpers = use('Helpers')
const Model = use('Model')
const Drive = use('Drive')
const Database = use('Database')

class Image extends Model {

    post() {
        return this.belongsTo('App/Models/Post');
    }

    static async removeAllImgOnDrive(postId) {
        let images = await Image
            .query()
            .where('post_id', postId)
            .fetch();

        const tmpImgs = images.toJSON();
        for (let i = 0; i < tmpImgs.length; i++) {
            const picPath = Helpers.publicPath('images/post_pictures/') + tmpImgs[i].url;
            await Drive.delete(picPath)
        }

        await Image
            .query()
            .where('post_id', postId)
            .delete();
    }

    static async getImages(postId, page, limit) {
        const query = Database
            .from('images')
            .where('post_id', postId)
            .orderBy('default', 'DESC');

        const images = await query.paginate(page, limit);
        return images.toJSON();
    }

    static async getImage(postId, imageId) {
        const image = await Image.query()
            .where('id', imageId)
            .andWhere('post_id', postId)
            .firstOrFail();
        return image;
    }

    static async getTotalImagesFromPost(postId) {
        return await Database.from('images')
            .where('post_id', postId)
            .count('* as total')
    }

}

module.exports = Image
