'use strict'
const InvalidRouteAccessException = use('App/Exceptions/InvalidRouteAccessException');

class RoleAuthotization {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request }, next, schemes) {
    if(schemes.find(item => item === auth.current.user.role)) {
      // call next to advance the request
      await next()
    } else {
      throw new InvalidRouteAccessException();
    }
  }
}

module.exports = RoleAuthotization
