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
    }

    static roles() {
        return {
            ADMIN: 'ADMIN',
            MANAGER: 'MANAGER',
            AGENT: 'AGENT',
            USER: 'USER'
        }
    }

    static async getUsers(page = 1, limit = 20, filter, role = null, orderBy = null) {
        const query = Database
            .from('users')
            .select('users.*', 'provincias.title as office_title')
            .leftJoin('offices', 'offices.id', 'users.office_id')
            .leftJoin('provincias', 'provincias.id', 'offices.provincia_id');

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
        return users;
    }

    static async getUser(id) {
        const query = User
            .query()
            .with('office.provincia')
            .where('id', id)

        return await query.first()
        // const user = await this.findOrFail(id);
        // return user;
    }

    static async getAgents(page, criteria, provincia) {
        const query = Database
            .select('users.id', 'users.fullname', 'users.telephone', 'users.email', 'users.picture')
            .table('users')
            .leftJoin('posts', 'users.id', 'posts.user_id')
            .where('users.id', '<>', 3) // Don't show my own account as agent
            .count('posts.id as total')
            .orderBy('total', 'DESC')
            .groupBy('users.id', 'users.fullname', 'users.telephone', 'users.email', 'users.picture');

        if (criteria) {
            let where = "(fullname like '%" + criteria + "%')";

            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }
        if (provincia) {
            query.innerJoin('user_provincias', 'users.id', 'user_provincias.user_id')
                .where('user_provincias.provincia_id', provincia)
        }

        const users = await query.paginate(page, 24);
        return users;
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

    bills() {
        return this.hasMany('App/Models/Bill')
    }

    alerts() {
        return this.hasMany('App/Models/Alert')
    }

    posts() {
        return this.hasMany('App/Models/Post')
    }

    owners() {
        return this.hasMany('App/Models/Owner')
    }

    userProvincias() {
        return this.hasMany('App/Models/UserProvincia')
    }

    office() {
        return this.belongsTo('App/Models/Office');
    }
}

module.exports = User
