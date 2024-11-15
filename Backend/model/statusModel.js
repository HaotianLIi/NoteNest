const db = require('../db')

const getStatusTable = async() => {
    try {
        const result = await db.any('SELECT * FROM status')
        
        if(result.length === 0){
            throw new Error('No data Found')
        }
        return result
    } catch (err) {
        console.error('Database error in getStatusTable: ', err)
        throw err
    }
}

const getStatusById = async (id) => {
    try {
        const result = await db.one('SELECT * FROM status WHERE id = $1', [id])
        if (result.length === 0){
            throw new Error('Status id not found')
        }
        return result
    } catch (err) {
        console.log('Error catched in getStatusById under statusModel: ', err)
        throw err
    }
}

const createStatus = async (status) => {
    try {
        const result = await db.oneOrNone('INSERT INTO status (status) VALUES ($1) RETURNING *', [status])
        console.log('status added: ', result)
        return result
    } catch (err) {
        if (err.recevied === 0){
            throw new Error('add new status falied')
        }
        throw err
    }
}

const deleteStatus = async (id) => {
    try {
        const result = await db.oneOrNone('DELETE FROM status WHERE id = $1 RETURNING *',[id])
        if (!result){
            throw new Error('status none exist')
        }
        return result
    } catch (err) {
        console.error('Error deleting status: ', err)
        throw err
    }
}

const updateStatus = async (status,id) => {
    try {
        const result = await db.oneOrNone('UPDATE status SET status = $1 WHERE id = $2 RETURNING *',
            [status,id]
        )
        if(!result){
            throw new Error('Update id not found')  
        } 
        console.log('Update successfully.', result)
        return result
    } catch (err) {
        console.log('Error catched in updateStatus: ', err)
        throw err
    }
}

module.exports = {
    getStatusTable,
    getStatusById,
    createStatus,
    deleteStatus,
    updateStatus
}