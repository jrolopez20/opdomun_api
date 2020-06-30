'use strict'
const Database = use('Database')
const Post = use('App/Models/Post');
const Municipio = use('App/Models/Municipio');

class Pu {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    // Model.prototype.calculatePu = async function (municipioId, influencia) {
    //     const municipio = await Municipio.find(municipioId)
    //
    //     this.result = municipio.prosp_urbana;
    //     this.points = this.result * influencia;
    //     await this.save();
    //
    //     let post = await Post.find(this.post_id);
    //     post.calculateOpdo()
    // }

    Model.calculatePu = async function (postId, municipioId, opdo = true) {
      const varPu = await Database
        .select('post_variables.id', 'post_variables.post_id', 'variables.influencia')
        .from('post_variables')
        .innerJoin('variables', 'variables.id', 'post_variables.variable_id')
        .where({
          'post_variables.post_id': postId,
          'variables.cod': 'Pu',
        })
        .first();

      const municipio = await Municipio.find(municipioId)
      const postVariable = await Model.find(varPu.id);
      postVariable.result = municipio.prosp_urbana;
      postVariable.points = parseFloat(municipio.prosp_urbana * varPu.influencia);
      await postVariable.save();

      let post = await Post.find(postId);
      post.calculateOpdo();
    }
  }
}

module.exports = Pu;
