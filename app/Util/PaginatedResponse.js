'use strict'

class PaginatedResponse {

    static parse(response, result) {
        response.header('Pagination-Count', result.total)
        response.header('Pagination-Page', result.page)
        response.header('Pagination-Limit', result.perPage)
        response.header('Access-Control-Expose-Headers', 'Pagination-Count, Pagination-Page, Pagination-Limit')

        return response.json(result.data)
    }
}

module.exports = PaginatedResponse
