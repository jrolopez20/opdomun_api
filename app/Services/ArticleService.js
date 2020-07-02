'use strict'

const Article = use('App/Models/Article');
const Database = use('Database');
const Drive = use('Drive');
const Helpers = use('Helpers');

class ArticleService {

    static async addArticle(request, authorId) {
        const title = request.input("title");
        const summary = request.input("summary");
        const text = request.input("text");

        const articlePicture = request.file('picture', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });

        let article = new Article();
        article.user_id = authorId;
        article.title = title;
        article.summary = summary;
        article.text = text;

        if (articlePicture) {
            const pictureName = new Date().getTime() + '.jpg';
            await articlePicture.move(Helpers.publicPath('images/article_pictures'), {
                name: pictureName
            });
            if (!articlePicture.moved()) {
                throw new Error(articlePicture.error());
            }
            article.picture = pictureName;
        }

        await article.save();
        return article;
    }

    static async setArticle(articleId, request) {
        const title = request.input("title");
        const summary = request.input("summary");
        const text = request.input("text");

        const articlePicture = request.file('picture', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });

        let article = await Article.find(articleId);
        if (!article) {
            throw new Error('Article not found');
        }
        article.title = title;
        article.summary = summary;
        article.text = text;

        if (articlePicture) {
            const pictureName = new Date().getTime() + '.jpg';

            if (article.picture) {
                const actualPicturePath = Helpers.publicPath('images/article_pictures/') + article.picture;
                const exists = await Drive.exists(actualPicturePath);
                if (exists) {
                    await Drive.delete(actualPicturePath)
                }
            }
            await articlePicture.move(Helpers.publicPath('images/article_pictures'), {
                name: pictureName
            });
            if (!articlePicture.moved()) {
                session.withErrors({'error': articlePicture.error()});
                return response.redirect('back')
            }
            article.picture = pictureName
        }

        await article.save();
        return article;
    }

    static async destroyArticle(articleId) {
        let article = await Article.find(articleId);
        if (article) {
            if (article.picture) {
                const picPath = Helpers.publicPath('images/user_pictures/') + article.picture;
                await Drive.delete(picPath)
            }
            return await article.delete();
        } else {
            throw new Error('Article not found');
        }
    }

}

module.exports = ArticleService;
