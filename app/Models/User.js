'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
const Provincia = use('App/Models/Provincia')

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

  userProvincias() {
    return this.hasMany('App/Models/UserProvincia')
  }
}

module.exports = User
