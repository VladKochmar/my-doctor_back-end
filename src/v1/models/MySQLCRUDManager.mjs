import pool from '../../../db/connectDB.mjs'
import QueryParser from '../../../utils/searchHelpers/QueryParser.mjs'
import FiltersHelper from '../../../utils/searchHelpers/FiltersHelper.mjs'

class MySQLCRUDManager {
  /**
   * Class constructor
   * @param {string} tableName - The name of the table to work with
   * @param {string} primaryKey - The primary key of the table
   */
  constructor(tableName, primaryKey) {
    this.tableName = tableName
    this.primaryKey = primaryKey
  }

  /**
   * Find a single record with filters and actions
   * @param {object} reqQuery - Query with filtering parameters
   * @param {object[]} fieldsConfiguration - Configuration of available fields for filtering
   * @param {string[]} fields - Fields for selection (default `*`)
   * @param {object[]} joins - An array of objects that describe a table join (JOIN)
   * @returns {object|null} - The first document found or `null'
   */
  async findOneWithSearchOptionsFromQuery(reqQuery, fieldsConfiguration, fields = ['*'], joins = []) {
    const { filters, actions } = QueryParser.parseQuery(reqQuery, fieldsConfiguration)

    const whereClause = FiltersHelper.applyFilters(filters)
    const actionsClause = FiltersHelper.applyActions(actions)
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
    SELECT ${fields.join(', ')}
    FROM ${this.tableName}
    ${joinClause}
    ${whereClause}
    ${actionsClause}
    LIMIT 1
    `

    const [rows] = await pool.execute(sql)
    return rows[0] || null
  }

  /**
   * Find multiple records with filters, pagination, and sorting
   * @param {object} reqQuery - Query with filtering parameters
   * @param {object[]} fieldsConfiguration - Configuration of available fields for filtering
   * @param {string[]} fields - Fields for selection (default `*`)
   * @param {object[]} joins - An array of objects that describe a table join (JOIN)
   * @returns {object} - An object with documents and the total number
   */
  async findManyWithSearchOptions(reqQuery, fieldsConfiguration, fields = ['*'], joins = []) {
    const { filters, actions } = QueryParser.parseQuery(reqQuery, fieldsConfiguration)

    const whereClause = FiltersHelper.applyFilters(filters)
    const actionsClause = FiltersHelper.applyActions(actions)
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
    SELECT ${fields.join(', ')}
    FROM ${this.tableName}
    ${joinClause}
    ${whereClause}
    ${actionsClause}
    `

    console.log('sql', sql)

    const countSql = `
    SELECT COUNT(*) AS total
    FROM ${this.tableName}
    ${joinClause}
    ${whereClause}
    `

    const [[countResult], [rows]] = await Promise.all([pool.execute(countSql), pool.execute(sql)])

    return { documents: rows, count: countResult[0].total }
  }

  /**
   * Find a single record by ID
   * @param {number} id - The ID of the record to find
   * @param {string[]} fields - The fields to select (default `*`)
   * @param {object[]} joins - An array of objects that describe a table join (JOIN)
   * @returns {object|null} - The found record or `null`
   */
  async findById(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
      SELECT ${fields.join(', ')}
      FROM ${this.tableName}
      ${joinClause}
      WHERE ${this.primaryKey} = ?
      LIMIT 1
      `

    const [rows] = await pool.execute(sql, [id])
    return rows[0] || null
  }

  /**
   * Create a new record
   * @param {object} data - An object with data to create a record
   * @returns {number} - ID of the created record
   */
  async create(data) {
    const fields = Object.keys(data)
    const placeholders = fields.map(() => '?').join(', ')
    const values = Object.values(data)

    const sql = `
    INSERT INTO ${this.tableName} (${fields.join(', ')})
    VALUES (${placeholders})
    `

    const [result] = await pool.execute(sql, values)
    return result.insertId
  }

  /**
   * Update a record by ID
   * @param {number} id - ID of the record to be updated
   * @param {object} data - An object with new data
   * @returns {boolean} - Whether the update was successful
   */
  async update(id, data) {
    const updates = Object.entries(data)
      .map(([key]) => `${key} = ?`)
      .join(', ')

    const values = [...Object.values(data), id]

    const sql = `
    UPDATE ${this.tableName}
    SET ${updates}
    WHERE ${this.primaryKey} = ?
    `

    const [result] = await pool.execute(sql, values)
    return result.affectedRows > 0
  }

  /**
   * Delete a record by ID
   * @param {number} id - ID of the record to be deleted.
   * @returns {boolean} - Whether the deletion was successful.
   */
  async deleteById(id) {
    const sql = `
    DELETE FROM ${this.tableName}
    WHERE ${this.primaryKey} = ?
    `

    const [result] = await pool.execute(sql, [id])
    return result.affectedRows > 0
  }
}

export default MySQLCRUDManager
