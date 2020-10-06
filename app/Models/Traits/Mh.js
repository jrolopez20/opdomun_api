'use strict'
const Post = use('App/Models/Post');
const Database = use('Database')

class Mh {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateMh = async function (moviliario, electrodomesticos) {
      const post = await Post.find(this.postId);
      let promedioMoviliario = 0;
      let promedioElectrodomestico = 0;
      if (moviliario && moviliario.length) {
        const moviliarioValues = await Database
          .select('nm.value')
          .from('nom_moviliarios as nm')
          .whereIn('id', moviliario)
        for (let item of moviliarioValues) {
          promedioMoviliario += parseInt(item.value)
        }
        promedioMoviliario = promedioMoviliario / moviliarioValues.length
      }
      if (electrodomesticos && electrodomesticos.length) {
        const electrodomesticoValues = await Database
          .select('nm.value')
          .from('nom_electrodomesticos as nm')
          .whereIn('id', electrodomesticos)
        for (let item of electrodomesticoValues) {
          promedioElectrodomestico += parseInt(item.value)
        }
        promedioElectrodomestico = promedioElectrodomestico / electrodomesticoValues.length
      }

      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = (promedioMoviliario + promedioElectrodomestico) / 2;
      this.points = this.result * variable.influencia;
      await this.save();
      post.calculateOpdo();
    }
  }
}

module.exports = Mh;
