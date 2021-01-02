'use strict'

const Env = use('Env')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: Env.get('CLOUDINARY_CLOUD_NAME'),
    api_key: Env.get('CLOUDINARY_API_KEY'),
    api_secret: Env.get('CLOUDINARY_API_SECRET')
});

class CloudinaryService {

    /**
     * Destroy cloudinary images
     * @param images
     * @returns {Promise<void>}
     */
    static async removeImages(publicIds) {
        cloudinary.api.delete_resources(
            publicIds,
            function (error, result) {
                console.log(result, error);
            }
        );
    }

}

module.exports = CloudinaryService
