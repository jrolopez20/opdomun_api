'use strict'
const Post = use('App/Models/Post');

class Fp {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateFp = async function (areaCrecimiento) {
      const post = await Post.find(this.post_id);
      const result = parseFloat(areaCrecimiento) / parseFloat(post.area) * 100

      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();
        post.calculateOpdo();
    }
  }
}

module.exports = Fp;
