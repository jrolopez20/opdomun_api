'use strict'

const Model = use('Model')
const Database = use('Database')

class VarConforEficiencia extends Model {
  static getDicc() {
    return {
      windowsCategory: [
        {
          value: '0.8', text: 'Miami sencilla de madera'
        }, {
          value: '0.7', text: 'Miami sencilla de aluminio'
        }, {
          value: '0.95', text: 'Miami de aluminio y tablillas de vidrio'
        }, {
          value: '0.9', text: 'Miami de madera con luceta'
        }, {
          value: '1', text: 'Hoja de tablilla de miami de madera embisagrada'
        }, {
          value: '0.85', text: 'Hoja lisa de madera embisagrada'
        }, {
          value: '0.6', text: 'Deslizante de aluminio y vidrio'
        }, {
          value: '0.65', text: 'Marquesina de aluminio y vidrio'
        }
      ],
      puntal: [
        {
          value: '100', text: 'Más de 4.00m'
        }, {
          value: '80', text: 'Entre 3.00m y 4.00m'
        }, {
          value: '60', text: 'Entre 2.50m y 3.00m'
        }, {
          value: '40', text: 'Menor de 2.50m'
        }
      ],
      solarProtection: [
        {
          value: '100', text: '100%'
        }, {
          value: '80', text: '75%'
        }, {
          value: '60', text: '50%'
        }, {
          value: '40', text: '25%'
        }, {
          value: '0', text: 'Sin protección'
        }
      ]
    }
  }

  static async getConfortAmbiental(postId) {
    return await VarConforEficiencia
        .query()
        .where('postId', postId)
        .first()
  }

  post() {
    return this.belongsTo('App/Models/Post', 'postId', 'id');
  }

}

module.exports = VarConforEficiencia
