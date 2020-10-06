'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PostVisit extends Model {

  static get hidden() {
    return ['postId', 'createdAt', 'updatedAt'];
  }

  static async inrementVisit(postId) {
    const postVisit = await PostVisit.findOrCreate(
      {postId},
      {postId, total: 0}
    )
    postVisit.total = 1 + parseInt(postVisit.total);
    await postVisit.save()
  }

  post() {
    return this.belongsTo('App/Models/Post')
  }
}

module.exports = PostVisit
