class FiltersHelper {
  /**
   * Creates a WHERE condition from an array of filters.
   * @param {string[]} filters - An array of SQL filters (for example, ["price >= 10", "name LIKE '%iPhone%'"]).
   * @returns {string} - Ready-made SQL condition WHERE.
   */
  static applyFilters(filters) {
    const flatFilters = filters.flat()
    return flatFilters.length ? `WHERE ${flatFilters.join(' AND ')}` : ''
  }

  /**
   * Creates SQL fragments for ORDER BY, LIMIT, OFFSET.
   * @param {object} actions - An object with SQL conditions for actions (sorting, pagination).
   * @param {string} actions.orderBy - SQL snippet for ORDER BY.
   * @param {string} actions.limit - SQL snippet for LIMIT.
   * @param {string} actions.offset - SQL snippet for OFFSET.
   * @returns {string} - A ready-made SQL snippet with actions.
   */
  static applyActions(actions) {
    let sql = ''
    if (actions.orderBy) {
      sql += ` ${actions.orderBy}`
    }
    if (actions.limit) {
      sql += ` ${actions.limit}`
    }
    if (actions.offset) {
      sql += ` ${actions.offset}`
    }
    return sql
  }
}

export default FiltersHelper
