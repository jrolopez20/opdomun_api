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
    // Home types
    Route.get('hometypes', 'HomeTypeController.index');

    // Provincias
    Route.get('provincias', 'ProvinciaController.index');

    // Municipios
    Route.get('provincias/:provinciaId/municipios', 'MunicipioController.index');

    // Offices
    Route.get('offices', 'OfficeController.index');

    // Images
    Route.resource('posts.images', 'ImageController').apiOnly();

    // Articles
    Route.resource('articles', 'ArticleController').validator(new Map([
            [['articles.store', 'articles.update'], ['SaveArticle']]
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly();

    // Subscriptions
    Route.resource('subscriptions', 'SubscriptionController')
        .validator(new Map([
            [['subscriptions.store'], ['StoreSubscription']]
        ]))
        .middleware(new Map([
            [['index', 'get', 'destroy'], ['auth']]
        ])).apiOnly();

    // Users
    Route.resource('users', 'UserController').validator(new Map([
            [['users.store'], ['StoreUser']],
            [['users.update'], ['UpdateUser']]
        ]))
        .middleware(['auth'])
        .apiOnly();
    Route.post('users/:id/password', 'UserController.changePassword').middleware(['auth']);
    Route.put('users/:id/toggle_enable', 'UserController.toggleEnable').middleware(['auth']);

    Route.resource('posts/:postId/owner', 'OwnerController')
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly();

    // Posts
    Route.resource('posts', 'PostController').validator(new Map([
            [['posts.store'], ['StorePost']],
            [['posts.update'], ['UpdatePost']]
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']],
            [['show'], ['visitors_count']]
        ])).apiOnly();
    Route.put('posts/:id/publish', 'PostController.publishPost').middleware(['auth']).validator('PublishPost');
    Route.put('posts/:id/calculate_price', 'AppraisalController.calculatePrice').middleware(['auth']).validator('PublishPost');
    Route.put('posts/:id/mark_as_sold', 'PostController.markAsSold').middleware(['auth']);

    Route.get('appraisals', 'AppraisalController.index').middleware(['auth']);

    Route.get('featured_posts', 'PostController.getFeaturedPosts');
    Route.get('recommended_posts', 'PostController.getRecommendedPosts');
    Route.post('free_post', 'PostController.addFreePost');

    Route.get('otherplaces', 'PostPlaceController.getOtherPlaces');
    Route.get('posts/:postId/post_variables', 'PostVariableController.getPostVariables').middleware(['auth']);
    Route.get('variables/:id/ec', 'VariableEcController.show').middleware(['auth']);
    Route.put('variables/:id/ec', 'VariableEcController.update').middleware(['auth']);
    Route.get('variables/:id/de', 'VariableDeController.show').middleware(['auth']);
    Route.put('variables/:id/de', 'VariableDeController.update').middleware(['auth']);
    Route.get('variables/:id/fp', 'VariableFpController.show').middleware(['auth']);
    Route.put('variables/:id/fp', 'VariableFpController.update').middleware(['auth']);
    Route.get('variables/:id/sc', 'VariableScController.show').middleware(['auth']);
    Route.put('variables/:id/sc', 'VariableScController.update').middleware(['auth']);
    Route.get('variables/:id/rd', 'VariableRdController.show').middleware(['auth']);
    Route.put('variables/:id/rd', 'VariableRdController.update').middleware(['auth']);
    Route.get('variables/:id/tc', 'VariableTcController.show').middleware(['auth']);
    Route.put('variables/:id/tc', 'VariableTcController.update').middleware(['auth']);
    Route.get('variables/:id/iu', 'VariableIuController.show').middleware(['auth']);
    Route.put('variables/:id/iu', 'VariableIuController.update').middleware(['auth']);
    Route.get('variables/:id/ds', 'VariableDsController.show').middleware(['auth']);
    Route.put('variables/:id/ds', 'VariableDsController.update').middleware(['auth']);
    Route.get('variables/:id/cr', 'VariableCrController.show').middleware(['auth']);
    Route.put('variables/:id/cr', 'VariableCrController.update').middleware(['auth']);
    Route.get('variables/:id/cf', 'VariableCfController.show').middleware(['auth']);
    Route.put('variables/:id/cf', 'VariableCfController.update').middleware(['auth']);
    Route.get('variables/:id/vs', 'VariableVsController.show').middleware(['auth']);
    Route.put('variables/:id/vs', 'VariableVsController.update').middleware(['auth']);
    Route.get('variables/:id/mh', 'VariableMhController.show').middleware(['auth']);
    Route.put('variables/:id/mh', 'VariableMhController.update').middleware(['auth']);

    Route.get('services', 'StatisticsController.getServices').middleware(['auth']);
    Route.get('services_by_office', 'StatisticsController.servicesByOffice').middleware(['auth']);
    Route.get('services_by_user', 'StatisticsController.servicesByUser').middleware(['auth']);

    Route.get('seguridad_ciudadana_options', 'VariableScController.getSeguridadCiudadanaValues').middleware(['auth']);
    Route.get('sol_tecnico_constructiva_options', 'VariableTcController.getSolTecnicoConstructivaValues').middleware(['auth']);
    Route.get('moviliario_options', 'VariableMhController.getMoviliarioOptions').middleware(['auth']);
    Route.get('electrodomestico_options', 'VariableMhController.getElectrodomesticoOptions').middleware(['auth']);


}).prefix('api');

// Authentication routes
Route.group(() => {
    Route.post('login', 'AuthController.login').validator('Auth')
}).prefix('api').namespace('Auth');



