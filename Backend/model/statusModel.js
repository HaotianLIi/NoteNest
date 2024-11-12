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

module.exports = {
    getStatusTable,
    getStatusById
}