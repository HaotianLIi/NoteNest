const db = require('../db')

const getNoteStatus = async () => {
    const result = await db.any('SELECT * FROM notes_status')
    console.log('Display notes_status table: ', result)
    return result
}

const getNoteStatusById = async (id) => {
    const result = await db.any('SELECT * FROM notes_status WHERE notes_id = $1',[id])
    console.log('under model: ', result)
    return result
}



module.exports = {
    getNoteStatus,
    getNoteStatusById
}