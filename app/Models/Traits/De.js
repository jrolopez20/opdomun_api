'use strict'
const Post = use('App/Models/Post');
const VarDisenoEstetica = use('App/Models/VarDisenoEstetica');

class De {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateDe = async function (valorArquitectonico, valorUrbano) {
      const post = await Post.find(this.post_id);

      await VarDisenoEstetica.query()
        .where('post_id', this.post_id)
        .delete()

      const varDisenoEstetica = new VarDisenoEstetica();
      varDisenoEstetica.post_id = this.post_id;
      varDisenoEstetica.valor_arquitectonico = valorArquitectonico;
      varDisenoEstetica.valor_urbano = valorUrbano;
      await varDisenoEstetica.save();

      const result = parseInt(valorArquitectonico) + parseInt(valorUrbano);
      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();
      post.calculateOpdo();
    }
  }
}

module.exports = De;
