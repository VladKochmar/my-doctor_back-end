class QueryParser {
  /**
   * Generates SQL conditions for a range filter.
   * @param {string} fieldName - The name of the field in the table.
   * @param {string} filterValue - Filter value (for example, "10-20" or ["gte:10", "lte:20"]).
   * @returns {string[]} - An array of SQL conditions for WHERE.
   */
  static range(fieldName, filterValue) {
    let minValue, maxValue

    // Перевірка на масив значень
    if (Array.isArray(filterValue)) {
      filterValue.forEach(val => {
        if (val.startsWith('gte:')) {
          minValue = parseFloat(val.slice(4))
        }
        if (val.startsWith('lte:')) {
          maxValue = parseFloat(val.slice(4))
        }
      })
    } else if (typeof filterValue === 'string') {
      // Якщо значення — рядок
      if (filterValue.startsWith('gte:')) {
        minValue = parseFloat(filterValue.slice(4))
      } else if (filterValue.startsWith('lte:')) {
        maxValue = parseFloat(filterValue.slice(4))
      }
    }

    const filters = []
    if (!isNaN(minValue)) {
      filters.push(`${fieldName} >= ${minValue}`)
    }
    if (!isNaN(maxValue)) {
      filters.push(`${fieldName} <= ${maxValue}`)
    }

    console.log(`Processing range filter for field: ${fieldName}, value: ${filterValue}`)
    return filters
  }

  /**
   * Generates SQL conditions for the "list of values" filter.
   * @param {string} fieldName - The name of the field in the table.
   * @param {string} filterValue - Filter value (For example, "electronics,books").
   * @returns {string} - SQL condition for WHERE.
   */
  static list(fieldName, filterValue) {
    let values

    if (typeof filterValue === 'string') {
      values = filterValue.split(',').map(val => `'${val.trim()}'`)
    } else if (Array.isArray(filterValue)) {
      values = filterValue.map(val => `'${val}'`)
    } else {
      throw new Error(`Invalid filterValue for list: ${filterValue}`)
    }

    return `${fieldName} IN (${values.join(', ')})`
  }

  /**
   * Generates a SQL condition for the search filter.
   * @param {string} fieldName - The name of the field in the table.
   * @param {string} filterValue - Filter value (For example, "iphone").
   * @returns {string} - SQL condition for WHERE.
   */
  static search(fieldName, filterValue) {
    return `${fieldName} LIKE '%${filterValue}%'`
  }

  /**
   * Parses all filters from the query.
   * @param {object[]} fieldsConfigurations - Configuration of fields for filtering.
   * @param {object} query - Query with filtering parameters.
   * @returns {string[]} - An array of SQL conditions for WHERE.
   */
  static filtersParser(fieldsConfigurations, query) {
    const filters = []
    console.log('Incoming query:', query)

    fieldsConfigurations.forEach(({ fieldName, filterCategory }) => {
      if (query[fieldName]) {
        console.log(`Parsing filter for: ${fieldName}`)
        filters.push(this[filterCategory](fieldName, query[fieldName]))
      }
    })

    console.log('Generated filters:', filters)
    return filters
  }

  /**
   * Parses actions (sorting, pagination) from the request.
   * @param {object} query - Request with action parameters.
   * @returns {object} - An object with SQL conditions (LIMIT, OFFSET, ORDER BY).
   */
  static actionsParser(query) {
    const actions = {
      orderBy: '',
      limit: '',
      offset: '',
    }

    if (query.sort) {
      const [field, order] = query.sort.split(':')
      actions.orderBy = `ORDER BY ${field} ${order === 'desc' ? 'DESC' : 'ASC'}`
    }
    if (query.perPage) {
      actions.limit = `LIMIT ${parseInt(query.perPage, 10)}`
    }
    if (query.page) {
      const page = parseInt(query.page, 10)
      const perPage = parseInt(query.perPage, 10) || 10 // The default value is 10
      actions.offset = `OFFSET ${(page - 1) * perPage}`
    }

    return actions
  }

  /**
   * A common method for parsing a query.
   * @param {object} query - Query with parameters.
   * @param {object[]} fieldsConfigurations - Configuration of fields for filtering.
   * @returns {object} - An object with separate filters and actions.
   */
  static parseQuery(query, fieldsConfigurations) {
    const filters = this.filtersParser(fieldsConfigurations, query)
    const actions = this.actionsParser(query)
    return { filters, actions }
  }
}

export default QueryParser
