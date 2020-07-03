'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// API routes
Route.group(() => {

    // Provincias
    Route.get('provincias', 'ProvinciaController.index');

    // Municipios
    Route.get('provincias/:provinciaId/municipios', 'MunicipioController.index');

    // Images
    Route.resource('posts.images', 'ImageController').apiOnly();

    // Articles
    Route.resource('articles', 'ArticleController').validator(new Map([
            [['articles.store', 'articles.update'], ['SaveArticle']]
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly();

    // Users
    Route.resource('users', 'UserController').validator(new Map([
            [['users.store'], ['StoreUser']],
            [['users.update'], ['UpdateUser']]
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly();
    Route.post('users/:id/change-password', 'UserController.changePassword').middleware(['auth']);

    // Posts
    Route.resource('posts', 'PostController').validator(new Map([
            [['posts.store'], ['StorePost']],
            [['posts.update'], ['UpdatePost']]
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly();


}).prefix('api');

// Authentication routes
Route.group(() => {
    Route.post('login', 'AuthController.login').validator('Auth')
}).prefix('auth').namespace('Auth');



