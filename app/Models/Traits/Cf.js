'use strict'
const Post = use('App/Models/Post');

class Cf {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateCf = async function (windowCategory, windowArea, puntal, solarProtection = 0,
                                                  eastProtection = 0, southProtection = 0, westProtection = 0) {
      let post = await Post.find(this.post_id);

      const tmpWindowArea = parseFloat(windowArea * windowCategory)
      let tempAreaVentanaEntreAreaPiso = tmpWindowArea / parseFloat(post.area)
      if (tempAreaVentanaEntreAreaPiso <= 0.1) {
        tempAreaVentanaEntreAreaPiso = 40
      } else if (tempAreaVentanaEntreAreaPiso > 0.1 && tempAreaVentanaEntreAreaPiso <= 0.25) {
        tempAreaVentanaEntreAreaPiso = 60
      } else if (tempAreaVentanaEntreAreaPiso > 0.25 && tempAreaVentanaEntreAreaPiso <= 0.5) {
        tempAreaVentanaEntreAreaPiso = 80
      } else {
        tempAreaVentanaEntreAreaPiso = 100
      }

      const average = (parseInt(tempAreaVentanaEntreAreaPiso) + parseInt(puntal)
        + (solarProtection ? parseInt(solarProtection) : 0)
        + (eastProtection ? parseInt(eastProtection) : 0)
        + (southProtection ? parseInt(southProtection) : 0)
        + (westProtection ? parseInt(westProtection) : 0)) / 6;

      await this.load('variable');
      const variable = this.getRelated('variable')
      this.result = average
      this.points = this.result * variable.influencia
      await this.save()

      post.calculateOpdo();
    }
  }
}

module.exports = Cf;
