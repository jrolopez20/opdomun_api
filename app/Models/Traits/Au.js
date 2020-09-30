'use strict'
const Post = use('App/Models/Post');
const Database = use('Database');

class Au {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.calculateAu = async function (postId, bedrooms, bathrooms, otherPlaces) {
      const varAu = await Database
        .select('post_variables.id', 'post_variables.post_id', 'variables.influencia')
        .from('post_variables')
        .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
        .where({
          'post_variables.post_id': postId,
          'variables.cod': 'Au',
        })
        .first();

      let sum = parseInt(bedrooms) * 100 + parseInt(bathrooms) * 100;
      if (otherPlaces.length) {
        for (let i = 0; i < otherPlaces.length; i++) {
          sum += parseFloat(otherPlaces[i].score);
        }
      }
      const result = parseFloat(sum / 15);

      const postVariable = await Model.find(varAu.id);
      postVariable.result = result;
      postVariable.points = result * varAu.influencia;
      await postVariable.save();

      let post = await Post.find(postId);
      post.calculateOpdo();
    }

    Model.getDiccAreaUtil = function () {
      const diccAreaUtil = [
        {
          title: 'Sala',
          score: 100
        },
        {
          title: 'Cocina',
          score: 100
        },
        {
          title: 'Patio de Servicio',
          score: 100
        },
        {
          title: 'Dormitorio Sencillo',
          score: 100
        },
        {
          title: 'Portal',
          score: 80
        },
        {
          title: 'Comedor',
          score: 80
        },
        {
          title: 'Terraza',
          score: 80
        },
        {
          title: 'Baño de visitas',
          score: 80
        },
        {
          title: 'Garaje',
          score: 80
        },
        {
          title: 'Dormitorio de Empleados',
          score: 80
        },
        {
          title: 'Trastero',
          score: 80
        },
        {
          title: 'Balcón',
          score: 80
        },
        {
          title: 'Piscina',
          score: 60
        },
        {
          title: 'Area exterior (Ranchón, gacebo, etc)',
          score: 60
        }
      ];

      return diccAreaUtil;
    }
  }
}

module.exports = Au
