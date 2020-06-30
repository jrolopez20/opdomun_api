'use strict'
const Post = use('App/Models/Post');
const EnvElement = use('App/Models/EnvElement')

class Vs {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.calculateVs = async function (items) {
      let result = 0;

      if (items.length > 0) {
        for (let item of items) {
          result += item.value;
        }
      }

      await EnvElement.removeEnvElement(this.id)
      await EnvElement.createMany(items)

      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();
      let post = await Post.find(this.post_id);
      post.calculateOpdo();
    }
  }
}

module.exports = Vs
