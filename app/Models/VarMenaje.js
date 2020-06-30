'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class VarMenaje extends Model {

  static async listMoviliario(postId) {
    const allMobiliario = await Database.select('nm.id', 'nm.title')
      .from('nom_moviliarios as nm');

    const selectedMobiliario = await Database.select('nm.id', 'nm.title', 'mm.id as menaje_moviliario_id')
      .from('nom_moviliarios as nm')
      .innerJoin('menaje_moviliarios as mm', 'nm.id', 'mm.moviliario_id')
      .innerJoin('var_menajes as m', function () {
        this
          .on('m.id', 'mm.menaje_id')
          .on('m.post_id', postId)
      });

    const list = allMobiliario.map(item => {
      let t = item;
      selectedMobiliario.map(selectItem => {
        if (item.id === selectItem.id) {
          t = {
            ...item,
            menaje_moviliario_id: selectItem.menaje_moviliario_id
          }
        }
      });
      return t;
    });
    return list;
  }

  static async listElectrodomesticos(postId) {
    const allElectroDom = await Database.select('ne.id', 'ne.title')
      .from('nom_electrodomesticos as ne');

    const selectedElectroDom = await Database.select('ne.id', 'ne.title', 'me.id as menaje_electrodomestico_id')
      .from('nom_electrodomesticos as ne')
      .innerJoin('menaje_electrodomesticos as me', 'ne.id', 'me.electrodomestico_id')
      .innerJoin('var_menajes as m', function () {
        this
          .on('m.id', 'me.menaje_id')
          .on('m.post_id', postId)
      });

    const list = allElectroDom.map(item => {
      let t = item;
      selectedElectroDom.map(selectItem => {
        if (item.id === selectItem.id) {
          t = {
            ...item,
            menaje_electrodomestico_id: selectItem.menaje_electrodomestico_id
          }
        }
      });
      return t;
    });
    return list;
  }

  static async getMenaje(postId) {
    const menaje = await this.findBy('post_id', postId);
    if (menaje && menaje.exist) {
      const moviliario = await Database.select('nm.id', 'nm.title')
        .from('var_menajes as m')
        .innerJoin('menaje_moviliarios as mm', 'm.id', 'mm.menaje_id')
        .innerJoin('nom_moviliarios as nm', 'nm.id', 'mm.moviliario_id')
        .where('m.post_id', postId)

      const electrodomestico = await Database.select('ne.id', 'ne.title')
        .from('var_menajes as m')
        .innerJoin('menaje_electrodomesticos as me', 'm.id', 'me.menaje_id')
        .innerJoin('nom_electrodomesticos as ne', 'ne.id', 'me.electrodomestico_id')
        .where('m.post_id', postId)
      return {
        moviliario: moviliario,
        electrodomestico: electrodomestico
      }
    } else {
      return false;
    }


  }

  menajeMoviliario() {
    return this.hasMany('App/Models/MenajeMoviliario');
  }

  menajeElectrodomestico() {
    return this.hasMany('App/Models/MenajeElectrodomestico');
  }

  post() {
    return this.belongsTo('App/Models/Post');
  }

}

module.exports = VarMenaje