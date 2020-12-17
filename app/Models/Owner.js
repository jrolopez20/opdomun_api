'use strict'

const Model = use('Model')

class Owner extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['createdAt', 'updatedAt', 'postId', 'subscriptionId', 'userId'];
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    subscription() {
        return this.belongsTo('App/Models/Subscription')
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id')
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
