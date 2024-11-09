const db = require('../db')

const getStatus = async() => {
    try {
        const result = await db.any('SELECT * FROM status')
        
        if(result.length === 0){
            throw new Error('No data Found')
        }
        return result
    } catch (err) {
        console.error('Database error in getStatus: ', err)
        throw new Error('Database error')
    }
}

module.exports = {
    getStatus
}