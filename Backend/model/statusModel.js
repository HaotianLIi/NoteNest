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

module.exports = {
    getStatusTable
}