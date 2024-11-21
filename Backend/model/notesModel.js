const db = require('../db')

const getNotesTable = async () => {
    const result = db.any('SELECT * FROM notes')
    console.log("Get notes table succeed: ", result)
    return result
}

const getNotesById = async (id) => {
    const result = await db.one('SELECT * FROM notes WHERE id = $1', [id])
    console.log("Get notes id succeed: ", result)
    return result
}

const createNotes = async (title,content,status_id) => {
    const result = await db.one(
        'INSERT INTO notes (title,content,status_id) VALUES ($1,$2,$3) RETURNING *'
        ,[title,content,status_id]
    )
    console.log("Created Succeed: ", result)
    return result
}

const updateNotes = async (title,content,status_id,id) => {
    const result = await db.any(
        'UPDATE notes SET title = $1, content = $2, status_id = $3 WHERE id = $4 RETURNING *'
        ,[title,content,status_id,id] 
    )
    console.log("Updated succeed: ", result)
    return result
}

const deleteNotes = async (id) => {
    const result = await db.result('DELETE FROM notes WHERE id = $1 RETURNING *',[id])
    console.log('Delete succeed: ', result)
    return result
}

module.exports = {
    getNotesTable,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
}