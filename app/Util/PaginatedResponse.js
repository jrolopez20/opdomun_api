'use strict'

class PaginatedResponse {

    static parse(response, result) {
        response.header('Pagination-Count', result.pagination.total)
        response.header('Pagination-Page', result.pagination.page)
        response.header('Pagination-Limit', result.pagination.perPage)
        response.header('Access-Control-Expose-Headers', 'Pagination-Count, Pagination-Page, Pagination-Limit')

        return response.json(result.data)
    }
}

module.exports = PaginatedResponse
