'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class User extends Model {

    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['password', 'picture', 'createdAt', 'updatedAt', 'closedAt'];
    }

    static roles() {
        return {
            ADMIN: 'ADMIN',
            MANAGER: 'MANAGER',
            AGENT: 'AGENT',
            CLIENT: 'CLIENT'
        }
    }

    static async getUsers(page = 1, limit = 20, filter, role = null, orderBy = null) {
        const query = User
            .query()
            .with('office.provincia')

        if (role) {
            query.where({role})
        }

        if (filter) {
            let where = `((fullname ilike '%${filter}%') OR (email like '%${filter}%'))`;
            query.whereRaw(where)
        }

        if (orderBy) {
            query.orderBy(orderBy, 'DESC')
        }

        limit = limit > 0 ? limit : undefined;
        const users = await query.paginate(page, limit);
        return users.toJSON();
    }

    static async getUser(id) {
        const query = User
            .query()
            .with('office.provincia')
            .where('id', id)

        const user = await query.first()
        return user;
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token', 'id', 'userId')
    }

    address() {
        return this.belongsTo('App/Models/Address', 'addressId', 'id');
    }

    posts() {
        return this.hasMany('App/Models/Post', 'id', 'managedById')
    }

    owners() {
        return this.hasMany('App/Models/Owner', 'id', 'userId')
    }

    articles() {
        return this.hasMany('App/Models/Article', 'id', 'userId')
    }

    subscriptions() {
        return this.hasMany('App/Models/Subscription', 'id', 'userId')
    }

    office() {
        return this.belongsTo('App/Models/Office', 'officeId', 'id');
    }
}

module.exports = User
