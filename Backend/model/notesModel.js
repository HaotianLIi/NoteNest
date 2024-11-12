const db = require('../db')

const getNotesTable = async () => {
    try {
        const result = db.any('SELECT * FROM notes')
        if(result.length === 0){
            throw new Error('Data Not Found')
        }
        return result
    } catch (err) {
        console.log('Error catched in getNotesTable under notesModel', err)
        throw err
    }
}

const getNotesById = async (id) => {
    try {
        const result = await db.one('SELECT * FROM notes WHERE id = $1', [id])
        if (result.length === 0){
            throw new Error('id not found')
        }
        return result
    } catch (err) {
        console.log('Error catched in getNotesById under notesModel ', err)
        throw err
    }
}

module.exports = {
    getNotesTable,
    getNotesById
}