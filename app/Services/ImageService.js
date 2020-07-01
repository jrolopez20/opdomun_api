'use strict'

const Image = use('App/Models/Image');
const Drive = use('Drive');
const Helpers = use('Helpers');

class ImageService {

    static async addImages(postId, request) {
        const trx = await Database.beginTransaction();
        const postPictures = request.file('post_images', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });
        let pictures = [];

        if (postPictures) {
            const maxUpPict = 10;

            const countImages = await Image.getTotalImagesFromPost(postId);
            const total = parseInt(postPictures.files.length) + parseInt(countImages[0].total);
            if (maxUpPict >= total) {
                await postPictures.moveAll(Helpers.publicPath('images/post_pictures'), (file) => {
                    const picName = `${new Date().getTime()}_${file.clientName}`;
                    pictures.push({
                        'post_id': postId,
                        'url': picName
                    });

                    return {
                        name: picName,
                        overwrite: false
                    }
                });


                if (postPictures.movedAll()) {
                    const images = await Image.createMany(pictures, trx);
                    await trx.commit();
                    return images;
                }
            } else {
                throw new Error('You cannot add more than ' + maxUpPict + ' images.');
            }
        }

        return response.redirect('back');
    }

    static async destroyImage(postId, imageId) {
        const image = await Image.find(imageId);
        if (image) {
            const picturePath = Helpers.publicPath('images/post_pictures/') + image.url;
            await Drive.delete(picturePath);
            return await image.delete();
        } else {
            throw new Error('Image not found');
        }
    }

    static async toogleActiveImage(postId, imageId) {
        // Deactivate the current image active
        await Image.query()
            .where({
                'post_id': postId,
                'default': 1
            })
            .update({'default': null});

        // Make active the new image
        const image = await Image.getImage(postId, imageId);
        image.default = 1;
        await image.save();

        return image;
    }
}

module.exports = ImageService;
