const {getNoteStatus, getNoteStatusById} = require('../model/notesStatusModel')

const getNotesStatusController = async (req, res) => {
    try {
        const result = await getNoteStatus()
        if(!result) {
            return res.status(404).send({message: 'Data not found in notes_status table'})
        }
        res.status(200).json({message: 'Displayed entire table', data: result})
    } catch (err) {
        res.status(500).send({message: `Server side error ${err.message}`})
    }
}

const getNoteStatusByIdController = async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(400).send({message: 'Validation: Missing id required field'})
    try {
        const result = await getNoteStatusById(id)
        if(!result) {
            return res.status(404).send({message: 'id not found in table notes_status'})    
        }
        res.status(200).json({message: 'Displayed Row by id', data: result})
    } catch (err) {
        res.status(500).send({message: `Server side error ${err.message}`})
    }
}

module.exports = {
    getNotesStatusController,
    getNoteStatusByIdController
}