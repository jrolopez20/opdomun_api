'use strict'

const Database = use('Database')
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
        const publicPath = Helpers.publicPath('images/post_pictures')
        let pictures = [];
        if (postPictures) {
            const maxUpPict = 10;

            const countImages = await Image.getTotalImagesFromPost(postId);
            const total = parseInt(postPictures.files ? postPictures.files.length : 1) + parseInt(countImages[0].total);
            if (maxUpPict >= total) {
                if(postPictures.files) {
                    await postPictures.moveAll(publicPath, (file) => {
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
                    // Case single file
                    const picName = `${new Date().getTime()}_${postPictures.clientName}`;
                    await postPictures.move(publicPath, {
                        name: picName,
                        overwrite: true
                    })

                    pictures.push({
                        'post_id': postId,
                        'url': picName
                    });

                    if (postPictures.moved()) {
                        const images = await Image.createMany(pictures, trx);
                        await trx.commit();
                        return images;
                    }
                }

            } else {
                throw new Error('You cannot add more than ' + maxUpPict + ' images.');
            }
        } else {
            throw new Error('You must provide images.');
        }
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
