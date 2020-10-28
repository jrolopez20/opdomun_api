'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Helpers = use('Helpers')
const Model = use('Model')
const Drive = use('Drive')
const Database = use('Database')
const Env = use('Env')

class Image extends Model {
    static postPictureFolder = 'images/post_pictures/'

    static pictureBaseUrl() {
        return `${Env.get('APP_URL')}/${Image.postPictureFolder}`;
    }

    static get hidden() {
        return ['postId', 'createdAt', 'updatedAt'];
    }

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

    setUrl(url) {
        if (url.includes('http://') || url.includes('https://')) {
            return url
        } else {
            return Image.pictureBaseUrl() + url
        }
    }

    static async removeAllImgOnDrive(postId) {
        let images = await Image
            .query()
            .where('postId', postId)
            .fetch();

        const tmpImgs = images.toJSON();
        for (let i = 0; i < tmpImgs.length; i++) {
            const picPath = Helpers.publicPath(Image.postPictureFolder) + tmpImgs[i].url;
            await Drive.delete(picPath)
        }

        await Image
            .query()
            .where('postId', postId)
            .delete();
    }

    static async getImages(postId, page, limit) {
        const query = Image
            .query()
            .where('postId', postId)
            .orderBy('default', 'DESC');

        const images = await query.paginate(page, limit);
        return images.toJSON();
    }

    static async getImage(postId, imageId) {
        const image = await Image.query()
            .where('id', imageId)
            .andWhere('postId', postId)
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
