'use strict'
const Post = use('App/Models/Post');
const ServPublico = use('App/Models/ServPublico');

class Ds {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    // Add an instance method
    Model.prototype.calculateDs = async function (dicc, request) {
      let valores = Array();
      const items = []
      let sum = 0;
      for (let servicio in dicc) {
        let displayValue = ''
        const value = request.input(servicio.toString())

        if (dicc[servicio.toString()]['Hasta 500m'] == value) {
          displayValue = 'Hasta 500m'
        } else if (dicc[servicio.toString()]['500m - 1100m'] == value) {
          displayValue = '500m - 1100m'
        } else if (dicc[servicio.toString()]['1100m - 2800m'] == value) {
          displayValue = '1100m - 2800m'
        } else {
          displayValue = 'Más de 2800m'
        }

        items.push({
          post_variable_id: this.id,
          value: value,
          display_value: displayValue,
          title: servicio.toString()
        })
        sum += parseInt(value)
      }

      await ServPublico.removeServPublicos(this.id)
      await ServPublico.createMany(items)

      const result = sum / items.length;

      await this.load('variable')
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();

      let post = await Post.find(this.post_id);
      post.calculateOpdo();
    }
  }
}

module.exports = Ds
