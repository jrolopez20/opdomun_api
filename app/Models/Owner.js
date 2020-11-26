'use strict'

const Model = use('Model')

class Owner extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['createdAt', 'updatedAt'];
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    static async addOwner({postId, userId, fullname, telephone, email}) {
        const owner = new Owner();
        owner.fill({
            postId, userId, fullname, telephone, email
        })
        await owner.save();

        return owner;
    }
}

module.exports = Owner
