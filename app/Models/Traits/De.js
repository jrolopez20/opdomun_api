'use strict'
const Post = use('App/Models/Post');
const VarDisenoEstetica = use('App/Models/VarDisenoEstetica');

class De {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateDe = async function (valorArquitectonico, valorUrbano) {
      const post = await Post.find(this.postId);

      await VarDisenoEstetica.query()
        .where('postId', this.postId)
        .delete()

      const varDisenoEstetica = new VarDisenoEstetica();
      varDisenoEstetica.postId = this.postId;
      varDisenoEstetica.valorArquitectonico = valorArquitectonico;
      varDisenoEstetica.valorUrbano = valorUrbano;
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
