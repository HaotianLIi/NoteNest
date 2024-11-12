const db = require('../db')

const getNotesTable = async () => {
    try {
        const result = db.any('SELECT * FROM notes')
        if(result.length === 0){
            throw new Error('Data Not Found')
        }
        return result
    } catch (err) {
        console.log('Database error in getNotesTable: ', err)
        throw err
    }
}

module.exports = {
    getNotesTable
}