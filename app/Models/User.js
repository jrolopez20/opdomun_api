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
        return ['password'];
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

        // const query = Database
        //     .from('users')
        //     .select('users.id', 'users.email', 'users.role', 'users.fullname', 'users.numid', 'users.telephone',
        //         'users.address', 'users.picture', 'users.created_at', 'users.closed_at', 'provincias.title as office_title')
        //     .leftJoin('offices', 'offices.id', 'users.office_id')
        //     .leftJoin('provincias', 'provincias.id', 'offices.provincia_id');

        if (role) {
            query.where({role})
        }

        if (filter) {
            let where = `((fullname like '%${filter}%') OR (email like '%${filter}%'))`;
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
        return this.hasMany('App/Models/Token')
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }

    owners() {
        return this.hasMany('App/Models/Owner')
    }

    articles() {
        return this.hasMany('App/Models/Article')
    }

    subscriptions() {
        return this.hasMany('App/Models/Subscription')
    }

    office() {
        return this.belongsTo('App/Models/Office');
    }
}

module.exports = User
