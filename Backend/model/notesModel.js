const db = require('../db')

const getNotesTable = async () => {
    const result = db.any('SELECT * FROM notes')
    if(!result) throw new Error('Data Not Found')
    console.log("Get notes table succeed: ", result)
    return result
}

const getNotesById = async (id) => {
    const result = await db.one('SELECT * FROM notes WHERE id = $1', [id])
    if (!result) throw new Error('id not found')
    console.log("Get notes id succeed: ", result)
    return result
}

const createNotes = async (title,body,status_id) => {
    const result = await db.one(
        'INSERT INTO notes (title,body,status_id) VALUES ($1,$2,$3) RETURNING *'
        ,[title,body,status_id]
    )
    if (!result) throw new Error('Creation Failed')
    console.log("Created Succeed: ", result)
    return result
}

const updateNotes = async (title,body,status_id,id) => {
    const result = await db.any(
        'UPDATE notes SET title = $1, body = $2, status_id = $3 WHERE id = $4 RETURNING *'
        ,[title,body,status_id,id] 
    )
    if(!result) throw new Error('Update Failed')
    console.log("Updated succeed: ", result)
    return result
}

const deleteNotes = async (id) => {
    const result = await db.result('DELETE FROM notes WHERE id = $1 RETURNING *',[id])
    if (!result) throw new Error('Notes none exist')
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