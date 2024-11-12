const {getNotesTable,getNotesById} = require('../model/notesModel')

const getAllNotesController = async (req, res) => {
    try {
        const result = await getNotesTable()
        res.json(result)
    } catch (err) {
        console.error('Error in getAllNotesController: ', err.message)
        if (err.message === 'Data Not Found'){
            res.status(404).send('No notes data found')
        }
        res.status(500).send(`Error message: ${err.message}`)
    }
}

const getNotesByIdController = async (req, res) => {
    const id = req.params.id
    try {
        const result = await getNotesById(id)
        res.json(result)
    } catch (err){
        console.error('Error in getNotesByIdController: ', err.message)
        if (err.message === 'id not found'){
            res.status(404).send('Notes id not found')
        }
        res.status(500).send(`Error message: ${err.message}`)
    }
}

module.exports = {
    getAllNotesController,
    getNotesByIdController
}