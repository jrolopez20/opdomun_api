'use strict'
const Post = use('App/Models/Post');

class Ec {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.prototype.calculateEc = async function (builtYear, buildStatus) {
      const actualyear = new Date().getFullYear();
      var age = parseInt(actualyear) - parseInt(builtYear);

      const dicc = {
        [Post.BUILD_STATUS_TYPES().EXCELENT]: {
          '1': 100,
          '5': 96.255,
          '10': 92.02,
          '15': 87.295,
          '20': 81.295,
          '25': 75.52,
          '30': 69.255,
          '35': 62.5,
          '40': 55.255,
          '45': 47.52,
          '50': 39.295,
          '55': 29.295,
          '60': 20.02,
          '65': 10.255,
          '70': 1.495
        },
        [Post.BUILD_STATUS_TYPES().VERY_GOOD]: {
          '1': 99.968,
          '5': 96.224,
          '10': 91.991,
          '15': 87.267,
          '20': 81.269,
          '25': 75.496,
          '30': 69.23,
          '35': 62.48,
          '40': 55.237,
          '45': 47.505,
          '50': 39.282,
          '55': 29.286,
          '60': 20.014,
          '65': 10.252,
          '70': 1.495
        },
        [Post.BUILD_STATUS_TYPES().GODD]: {
          '1': 97.48,
          '5': 93.83,
          '10': 89.7,
          '15': 85.49,
          '20': 79.25,
          '25': 73.62,
          '30': 67.51,
          '35': 60.93,
          '40': 53.86,
          '45': 46.32,
          '50': 38.3,
          '55': 28.56,
          '60': 19.52,
          '65': 10,
          '70': 1.46
        },
        [Post.BUILD_STATUS_TYPES().REGULAR]: {
          '1': 81.9,
          '5': 78.83,
          '10': 75.37,
          '15': 71.49,
          '20': 66.58,
          '25': 61.85,
          '30': 56.72,
          '35': 51.19,
          '40': 45.26,
          '45': 38.92,
          '50': 32.18,
          '55': 23.99,
          '60': 16.4,
          '65': 8.41,
          '70': 1.22
        },
        [Post.BUILD_STATUS_TYPES().BAD]: {
          '1': 66.8,
          '5': 64.3,
          '10': 61.48,
          '15': 58.31,
          '20': 54.31,
          '25': 50.45,
          '30': 46.26,
          '35': 41.75,
          '40': 36.91,
          '45': 31.74,
          '50': 26.25,
          '55': 19.57,
          '60': 13.37,
          '65': 6.85,
          '70': 1
        },
        [Post.BUILD_STATUS_TYPES().VERY_BAD]: {
          '1': 47.4,
          '5': 45.62,
          '10': 43.62,
          '15': 41.38,
          '20': 38.54,
          '25': 35.8,
          '30': 32.83,
          '35': 29.63,
          '40': 26.19,
          '45': 22.52,
          '50': 18.63,
          '55': 13.89,
          '60': 9.49,
          '65': 4.86,
          '70': 0.71
        },
        [Post.BUILD_STATUS_TYPES().DEMOLITION]: {
          '1': 24.8,
          '5': 23.87,
          '10': 22.82,
          '15': 21.65,
          '20': 20.16,
          '25': 18.73,
          '30': 17.17,
          '35': 15.5,
          '40': 13.71,
          '45': 11.78,
          '50': 9.74,
          '55': 7.26,
          '60': 4.95,
          '65': 2.55,
          '70': 0.37
        }
      };

      let result = null;
      const temp = [70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 1];
      for (let tempAge of temp) {
        if (age >= parseInt(tempAge)) {
          result = dicc[buildStatus][tempAge.toString()];
          break;
        }
      }

      await this.load('variable');
      const variable = this.getRelated('variable');
      this.result = result;
      this.points = result * variable.influencia;
      await this.save();

      let post = await Post.find(this.postId);
      post.builtYear = builtYear;
      post.buildStatus = buildStatus;
      post.calculateOpdo();
    }
  }
}

module.exports = Ec;
