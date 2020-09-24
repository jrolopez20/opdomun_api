'use strict'

class CastDate {
  register(Model, customOptions = {}) {
    Model.castDates = function(field, value) {
      return value;
    }
  }
}

module.exports = CastDate
