'use strict'

const Model = use('Model')

class Plan extends Model {
    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    static TYPES() {
        return {
            PREMIUM: 'PREMIUM',
            FREE: 'FREE'
        }
    }

    posts() {
        return this.hasMany('App/Models/Post', 'id', 'planId')
    }
}

module.exports = Plan
