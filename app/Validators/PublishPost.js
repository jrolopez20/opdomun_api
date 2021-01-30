'use strict'

use('App/Validators/ValidatorExtensions.js');

class PublishPost {

    get rules() {
        const postId = this.ctx.params.id;
        return {
            postId: `complete:${postId}|pictureRequired:${postId}`
        }
    }

    get messages() {
        return {
            'postId.complete': 'Debe completar todos los indicadores antes de publicar.',
            'postId.pictureRequired': 'El anuncio debe tener una imagen de portada para ser publicado.'
        }
    }
}

module.exports = PublishPost;
