'use strict'

const Model = use('Model')

class NomElectrodomestico extends Model {

    menajeElectrodomestico() {
        return this.hasMany('App/Models/MenajeElectrodomestico', 'id', 'electrodomesticoId');
    }
}

module.exports = NomElectrodomestico
