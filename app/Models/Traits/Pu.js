'use strict'
const Database = use('Database')
const Post = use('App/Models/Post');
const Municipio = use('App/Models/Municipio');

class Pu {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.calculatePu = async function (postId) {
      const varPu = await Database
        .select('post_variables.id', 'post_variables.post_id as postId', 'variables.influencia')
        .from('post_variables')
        .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
        .where({
          'post_variables.post_id': postId,
          'variables.cod': 'Pu',
        })
        .first();

      const fetchPost = await Post
          .query()
          .setVisible(['id'])
          .with('address.localidad.municipio')
          .where('id', postId)
          .first();

      const prospUrbana = fetchPost.toJSON().address.localidad.municipio.prospUrbana

      const postVariable = await Model.find(varPu.id);
      postVariable.result = prospUrbana;
      postVariable.points = parseFloat(prospUrbana * varPu.influencia);
      await postVariable.save();

      const post = await Post.find(postId);
      post.calculateOpdo();
    }
  }
}

module.exports = Pu;
