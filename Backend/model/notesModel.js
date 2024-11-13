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

const createNotes = async (title,body,status_id) => {
    try {
        const result = await db.one(
            'INSERT INTO notes (title,body,status_id) VALUES ($1,$2,$3) RETURNING *'
            ,[title,body,status_id]
        )
        console.log("Insert result: ", result)
        return result
    } catch (err) {
        if (err.received === 0){
            throw new Error('Data not found')
        }
        throw err
    }
}

const updateNotes = async (title,body,status_id,id) => {
    try {
        const result = await db.any(
            'UPDATE notes SET title = $1, body = $2, status_id = $3 WHERE id = $4 RETURNING *'
            ,[title,body,status_id,id] 
        )
        console.log("Data updated: ", result)
        return result
    } catch (err) {
        if (err.received === 0){
            throw new Error('Data not found')
        }
        throw err
    }
}

const deleteNotes = async (id) => {
    try {
        const result = await db.result('DELETE FROM notes WHERE id = $1 RETURNING *',[id])
        console.log(`Rows deleted: ${result.rowCount}`);
        return result
    } catch (err) {
        if(err.received === 0){
            throw new Error('Data not found')
        }
        throw err
    }
} 

module.exports = {
    getNotesTable,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes

}