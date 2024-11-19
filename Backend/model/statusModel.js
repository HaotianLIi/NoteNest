const db = require('../db')

const getStatusTable = async() => {
    const result = await db.any('SELECT * FROM status')
    if(!result) throw new Error('No data Found')
    console.log('Data Found: ', result)
    return result
}

const getStatusById = async (id) => {
    const result = await db.one('SELECT * FROM status WHERE id = $1', [id])
    if (!result) throw new Error('Status id not found')
    console.log('Data id Found: ', result)
    return result
}

const createStatus = async (status) => {
    const result = await db.oneOrNone('INSERT INTO status (status) VALUES ($1) RETURNING *', [status])
    if(!result) throw new Error('Add new status failed')
    console.log(`status '${result.status}' added in table`)
    return result
}

const deleteStatus = async (id) => {
    const result = await db.oneOrNone('DELETE FROM status WHERE id = $1 RETURNING *',[id])  
    if(!result) throw new Error('Delete status failed')
    console.log('status model ', result)
    return result
}

const updateStatus = async (status,id) => {
    const result = await db.oneOrNone('UPDATE status SET status = $1 WHERE id = $2 RETURNING *',
        [status,id]
    )
    if(!result) throw new Error('Update status failed')  
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