'use strict'

const Model = use('Model')

class HomeType extends Model {

    static castDates(field, value) {
        return value;
    }

    static get hidden(){
        return ['createdAt', 'updatedAt']
    }

    static async getHomeTypes() {
        return await HomeType.all()
    }

    posts() {
        return this.hasMany('App/Models/Post', 'id', 'homeTypeId')
    }
}

module.exports = HomeType
