'use strict'

const Article = use('App/Models/Article');
const Drive = use('Drive');
const Helpers = use('Helpers');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

class ArticleService {

    static async addArticle(request, userId) {
        const {title, summary, text} = request.all();

        const articlePicture = request.file('picture', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });

        let article = new Article();
        article.fill({
            userId,
            title,
            summary,
            text
        })

        if (articlePicture) {
            const pictureName = new Date().getTime() + '.jpg';
            await articlePicture.move(Helpers.publicPath(Article.getArticlePictureFolder()), {
                name: pictureName
            });
            if (!articlePicture.moved()) {
                throw new Error(articlePicture.error());
            }
            article.picture = pictureName;
        }
        await article.save();

        return await Article.find(article.id);
    }

    static async setArticle(articleId, request) {
        const {title, summary, text} = request.all();

        const articlePicture = request.file('picture', {
            types: ['image'],
            extnames: ['jpg', 'jpeg', 'png'],
            size: '1mb'
        });

        let article = await Article.find(articleId);
        if (!article) {
            throw new ResourceNotFoundException()
        }
        article.title = title
        article.summary = summary
        article.text = text

        if (articlePicture) {
            const pictureName = new Date().getTime() + '.jpg';

            if (article.picture) {
                const actualPicturePath = Helpers.publicPath(Article.getArticlePictureFolder()) + article.picture;
                const exists = await Drive.exists(actualPicturePath);
                if (exists) {
                    await Drive.delete(actualPicturePath)
                }
            }
            await articlePicture.move(Helpers.publicPath(Article.getArticlePictureFolder()), {
                name: pictureName
            });
            if (!articlePicture.moved()) {
                session.withErrors({'error': articlePicture.error()});
                return response.redirect('back')
            }
            article.picture = pictureName
        }
        await article.save();

        return Article.find(article.id);
    }

    static async destroyArticle(articleId) {
        try {
            let article = await Article.findOrFail(articleId);
            if (article.picture) {
                const picPath = Helpers.publicPath(Article.getArticlePictureFolder()) + article.picture;
                await Drive.delete(picPath)
            }
            return await article.delete();
        }
        catch (e) {
            throw new ResourceNotFoundException()
        }
    }

}

module.exports = ArticleService;
