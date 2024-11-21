const db = require('../db')

const getStatusTable = async() => {
    const result = await db.any('SELECT * FROM status')
    console.log('Data Found: ', result)
    return result
}

const getStatusById = async (id) => {
    const result = await db.one('SELECT * FROM status WHERE id = $1', [id])
    console.log('Data id Found: ', result)
    return result
}

const createStatus = async (status) => {
    const result = await db.oneOrNone('INSERT INTO status (status) VALUES ($1) RETURNING *', [status])
    console.log(`status '${result.status}' added in table`)
    return result
}

const deleteStatus = async (id) => {
    const result = await db.oneOrNone('DELETE FROM status WHERE id = $1 RETURNING *',[id])  
    console.log('status model ', result)
    return result
}

const updateStatus = async (status,id) => {
    const result = await db.oneOrNone('UPDATE status SET status = $1 WHERE id = $2 RETURNING *',
        [status,id]
    )
    console.log('Update successfully.', result)
    return result
}

module.exports = {
    getStatusTable,
    getStatusById,
    createStatus,
    deleteStatus,
    updateStatus
}