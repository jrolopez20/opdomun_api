'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Riesgo extends Model {

  static async getRiesgoDesastre(postId) {
    return await Database.select('r.id', 'r.value', 'r.type')
      .from('riesgos as r')
      .innerJoin('post_variables as pv', 'pv.id', 'r.post_variable_id')
      .where('pv.post_id', postId)
      .first()
  }

  static getRiskTypes() {
    const riskTypes = [
      'Áreas bajas donde puedan existir inundaciones por penetraciones del mar',
      'Áreas cerca de aliviaderos de presas o embalses',
      'Áreas de sequías prolongadas',
      'Áreas industriales',
      'Áreas donde puedan existir edificios con peligros de derrumbes',
      'Áreas afectadas por sismos'
    ];
    return riskTypes;
  }

  postVariable() {
    return this.belongsTo('App/Models/PostVariable');
  }

}

module.exports = Riesgo
