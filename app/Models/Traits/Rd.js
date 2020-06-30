'use strict'
const Post = use('App/Models/Post');
const Riesgo = use('App/Models/Riesgo');
const Database = use('Database')

class Rd {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    /**
     *
     * @param tcResult Puntos de la solucion tecnico constructiva
     * @param ecResult Puntos del estado de conservacion de la vivienda
     * @param riskZone
     * @returns {Promise.<void>}
     */
    Model.prototype.calculateRd = async function (tcResult, ecResult, riskZone, riskType) {
      let result = (parseFloat(tcResult) + parseFloat(ecResult) + parseInt(riskZone)) / 3;

      await this.riesgo().delete();
      await this.riesgo().create({
        value: riskZone,
        type: riskType
      });

      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();

      let post = await Post.find(this.post_id);
      post.calculateOpdo();
    }

    Model.prototype.getRdRequiredData = async function () {
      const variables = await Database
        .table('post_variables')
        .select(
          'variables.cod',
          'variables.title',
          'post_variables.id',
          'post_variables.result',
          'post_variables.points'
        )
        .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
        .where('post_variables.post_id', this.post_id)
        .andWhere('variables.cod', 'in', ['Tc', 'Ec']);

      return variables;
    }
  }
}

module.exports = Rd;
