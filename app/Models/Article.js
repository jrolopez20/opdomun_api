'use strict'

const Model = use('Model')
const Env = use('Env')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

class Article extends Model {
    static articlePictureFolder = 'images/article_pictures/'

    static pictureBaseUrl() {
        return `${Env.get('APP_URL')}/${Article.articlePictureFolder}`;
    }

    static boot() {
        super.boot()
        this.addTrait('CastDate')
    }

    static get hidden() {
        return ['userId', 'updatedAt'];
    }

    /**
     * Picture getter
     *
     * @param value
     * @returns {string} full url to picture
     */
    getPicture(value) {
        return value ? Article.pictureBaseUrl() + value : null
    }

    static async getArticles(page = 1, limit = 20, filter = null) {
        const query = Article
            .query()
            .setVisible(['id', 'title', 'sumary', 'picture', 'createdAt'])
            .with('user', (builder) => {
                builder.setVisible(['id', 'fullname'])
            })
            .orderBy('updatedAt', 'DESC')

        if (filter) {
            let where = "(title ilike '%" + filter + "%') OR (summary ilike '%" + filter + "%') OR (text ilike '%" + filter + "%')";
            where = where + " AND true = ?";
            query.whereRaw(where, [true])
        }

        const articles = await query.paginate(page, limit);
        return articles.toJSON();
    }

    static async getArticle(id) {
        const article = await Article
            .query()
            .with('user')
            .where('id', id)
            .first()

        if (!article) {
            throw new ResourceNotFoundException();
        }

        return await article;
    }

    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id');
    }

}

module.exports = Article
