'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenajeElectrodomestico extends Model {

  varMenaje() {
    return this.belongsTo('App/Models/VarMenaje', 'menajeId', 'id');
  }

  nomElectrodomestico() {
    return this.belongsTo('App/Models/NomElectrodomestico', 'electrodomesticoId', 'id');
  }

}

module.exports = MenajeElectrodomestico
