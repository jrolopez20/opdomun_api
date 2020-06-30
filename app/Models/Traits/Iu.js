'use strict'
const Post = use('App/Models/Post');
const InfUrbana = use('App/Models/InfUrbana')

class Iu {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    // Add an instance method
    Model.prototype.calculateIu = async function (items) {
      let sum = 0;
      for (let item of items) {
        sum += item.value;
      }

      const result = sum / items.length;

      await InfUrbana.removeInfUrbana(this.id)
      await InfUrbana.createMany(items)

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

module.exports = Iu
