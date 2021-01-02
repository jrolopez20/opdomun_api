'use strict'

const Helpers = use('Helpers')
const Model = use('Model')
const Drive = use('Drive')
const Database = use('Database')
const Env = use('Env')
const CloudinaryService = use('App/Services/CloudinaryService')

const PostPictureFolder = 'images/post_pictures/'

class Image extends Model {

    static getPostPictureFolder() {
        return PostPictureFolder;
    }

    static pictureBaseUrl() {
        return `${Env.get('APP_URL')}/${Image.getPostPictureFolder()}`;
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
        const publicIds = []
        for (let i = 0; i < tmpImgs.length; i++) {
            const picPath = Helpers.publicPath(Image.getPostPictureFolder()) + tmpImgs[i].url;

            if (picPath.toString().indexOf('cloudinary.com') !== -1) {
                publicIds.push(Image.extractPublicId(picPath))
            } else {
                await Drive.delete(picPath)
            }
        }

        // Remove images from cloudinary
        if (publicIds.length) {
            await CloudinaryService.removeImages(publicIds)
        }

        await Image
            .query()
            .where('postId', postId)
            .delete();
    }

    static extractPublicId(url) {
        const i = url.toString().lastIndexOf('/opdomun/')
        const fullName = url.toString().slice(i + 1)
        console.log(fullName)
        return fullName.slice(0, fullName.indexOf('.'))
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
