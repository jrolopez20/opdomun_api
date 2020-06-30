'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenajeElectrodomestico extends Model {

  varMenaje() {
    return this.belongsTo('App/Models/VarMenaje');
  }
  nomElectrodomestico() {
    return this.belongsTo('App/Models/NomElectrodomestico');
  }

}

module.exports = MenajeElectrodomestico
