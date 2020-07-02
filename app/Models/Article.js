'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Article extends Model {

    static boot() {
        super.boot()
    }

    static async getArticles(page = 1, limit = 20, filter = null, authorId = null) {
        const query = Database
            .from('articles')
            .select('articles.id', 'articles.title', 'articles.summary', 'articles.text', 'articles.picture',
                'articles.created_at', 'users.fullname')
            .innerJoin('users', 'users.id', 'articles.user_id')
            .orderBy('articles.created_at', 'DESC')

        if (filter) {
            let where = "(title like '%" + filter + "%') OR (summary like '%" + filter + "%') OR (text like '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        if (authorId) {
            query.andWhere('articles.user_id', authorId)
        }

        const articles = await query.paginate(page, limit);
        return articles;
    }

    static async getArticle(id) {
        const article = await this.query()
            .select('articles.id', 'articles.title', 'articles.summary', 'articles.text', 'articles.picture',
                'articles.created_at', 'users.fullname')
            .innerJoin('users', 'users.id', 'articles.user_id')
            .where('articles.id', id)
            .firstOrFail();

        return article;
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Article
