'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
    static resetPasswordKey() {
        return 'reset_password'
    }

    static async removeToken(user, type) {
        await Token
            .query()
            .where('userId', user.id)
            .where('type', type)
            .delete()
    }

    static async getUserTokenByType(user, type) {
        const token = await Token
            .query()
            .where('userId', user.id)
            .where('type', type)
            .first()
        return token;
    }
}

module.exports = Token
