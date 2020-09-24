'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static async getArticles(page = 1, limit = 20, filter = null, sortBy) {
        const query = Article
            .query()
            .with('user')

        if (filter) {
            let where = "(title like '%" + filter + "%') OR (summary like '%" + filter + "%') OR (text like '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        if (sortBy) {
            query.orderBy(sortBy, 'DESC')
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
