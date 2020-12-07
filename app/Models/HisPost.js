'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HisPost extends Model {
    static STATES() {
        return {
            NEW: 'NEW',
            PUBLISHED:'PUBLISHED',
            RENEW:'RENEW',
            SOLD:'SOLD',
            CLOSED:'CLOSED',
        }
    }

    post() {
        return this.belongsTo('App/Models/Post', 'postId', 'id');
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id');
    }
}

module.exports = HisPost
