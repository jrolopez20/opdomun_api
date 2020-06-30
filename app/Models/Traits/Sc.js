'use strict'
const Post = use('App/Models/Post');

class Sc {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateSc = async function (segCdna) {
      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = segCdna;
      this.points = this.result * variable.influencia;
      await this.save();

      let post = await Post.find(this.post_id);
      post.calculateOpdo();
    }
  }
}

module.exports = Sc;
