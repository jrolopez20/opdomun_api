'use strict'

class SaveArticle {
    get rules() {
        return {
            title: 'required',
            summary: 'required',
            text: 'required'
        }
    }

    get messages() {
        return {
            'title.required': 'You must provide a title',
            'summary.required': 'You must provide a summary',
            'text.required': 'You must provide a text'
        }
    }

    get validateAll() {
        return true
    }
}

module.exports = SaveArticle;
