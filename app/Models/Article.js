'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['user_id', 'updated_at'];
    }

    static async getArticles(page = 1, limit = 20, filter = null) {
        const query = Article
            .query()
            .setVisible(['id', 'title', 'sumary', 'created_at'])
            .with('user', (builder) => {
                builder.setVisible(['id', 'fullname'])
            })

        if (filter) {
            let where = "(title ilike '%" + filter + "%') OR (summary ilike '%" + filter + "%') OR (text ilike '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        const articles = await query.paginate(page, limit);
        return articles.toJSON();
    }

    static async getArticle(id) {
        const query = Article
            .query()
            .with('user')
            .where('id', id)


        return await query.firstOrFail();
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Article
