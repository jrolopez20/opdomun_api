'use strict'

class PaginatedResponse {

    static parse(response, result) {
        if (result.pagination) {
            response.header('Pagination-Count', result.pagination.total)
            response.header('Pagination-Page', result.pagination.page)
            response.header('Pagination-Limit', result.pagination.perPage)
            response.header('Access-Control-Expose-Headers', 'Pagination-Count, Pagination-Page, Pagination-Limit')
        } else {
            response.header('Pagination-Count', result.total)
            response.header('Pagination-Page', result.page)
            response.header('Pagination-Limit', result.perPage)
            response.header('Access-Control-Expose-Headers', 'Pagination-Count, Pagination-Page, Pagination-Limit')
        }

        return response.json(result.data)
    }
}

module.exports = PaginatedResponse
