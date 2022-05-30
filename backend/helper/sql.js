const {ExpressError} = require("../expressError")

const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
  const keys = Object.keys(dataToUpdate)
  if (keys.length === 0) throw new ExpressError('No Data')

  const cols = keys.map((colName, idx) => {
    return (`"${jsToSql[colName] || colName}"=$${idx + 1}`)
  })

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate)
  }
}

module.exports = {sqlForPartialUpdate}