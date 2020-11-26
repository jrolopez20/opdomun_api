'use strict'

const Model = use('Model')

class MenajeMoviliario extends Model {

  varMenaje() {
    return this.belongsTo('App/Models/VarMenaje', 'menajeId', 'id');
  }
  nomMoviliario() {
    return this.belongsTo('App/Models/NomMoviliario', 'moviliarioId', 'id');
  }

}

module.exports = MenajeMoviliario
