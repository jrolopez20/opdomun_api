'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Article extends Model {

  static boot() {
    super.boot()
  }

  static async getArticle(id) {
    const article = await Database
      .from('articles')
      .select('articles.id', 'articles.title', 'articles.summary', 'articles.text', 'articles.picture',
        'articles.created_at', 'users.fullname')
      .innerJoin('users', 'users.id', 'articles.user_id')
      .where('articles.id', id)
      .first()
    return article
  }

  static async getAll(pPage, auth) {
    const page = pPage ? pPage : 1;
    const query = Database
      .from('articles')
      .select('articles.id', 'articles.title', 'articles.summary', 'articles.text', 'articles.picture',
        'articles.created_at', 'users.fullname')
      .innerJoin('users', 'users.id', 'articles.user_id')
      .orderBy('articles.created_at', 'ASC')

    if (auth) {
      auth.user.id
      query.andWhere('articles.user_id', auth.user.id)
    }

    const articles = await query.paginate(page, 5);
    return articles
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

}

module.exports = Article
