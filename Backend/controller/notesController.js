const {getNotesTable} = require('../model/notesModel')

const getAllNotes = async (req, res) => {
    try {
        const result = await getNotesTable()
        res.json(result)
    } catch (err) {
        console.error('Error in getAllNotes: ', err.message)
        if (err.message === 'Data Not Found'){
            res.status(404).send('No notes data found')
        }
        res.status(500).send(`Error message: ${err.message}`)
    }

}

module.exports = {
    getAllNotes
}