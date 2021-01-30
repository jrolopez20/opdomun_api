'use strict'

use('App/Validators/ValidatorExtensions.js');

class CalculatePrice {

    get rules() {
        const postId = this.ctx.params.id;
        return {
            postId: `complete:${postId}`
        }
    }

    get messages() {
        return {
            'postId.complete': 'Debe completar todos los indicadores para poder calcular el precio del inmueble.'
        }
    }
}

module.exports = CalculatePrice;
