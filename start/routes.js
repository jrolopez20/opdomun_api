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
    Route.get('/', () => {
        return {greeting: 'Hello world in JSON'}
    })

    Route.resource('users', 'UserController').validator(new Map([
        [['users.store'], ['StoreUser']],
        [['users.update'], ['UpdateUser']]
    ])).apiOnly()
    Route.post('users/:id/change-password', 'UserController.changePassword')

}).prefix('api');

// Authentication routes
Route.group(() => {
    Route.post('login', 'AuthController.login').validator('Auth')
}).prefix('auth').namespace('Auth');



