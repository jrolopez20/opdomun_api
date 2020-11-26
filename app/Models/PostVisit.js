'use strict'

const Model = use('Model')

class PostVisit extends Model {

  static get hidden() {
    return ['postId', 'createdAt', 'updatedAt'];
  }

  static get computed () {
    return ['lastVisit']
  }

  getLastVisit ({ updatedAt }) {
    return updatedAt
  }

  static get lasVisit() {
    return new Date();
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
