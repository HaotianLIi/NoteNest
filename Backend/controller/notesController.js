const {getNotesTable,getNotesById,createNotes,updateNotes,deleteNotes} = require('../model/notesModel')

const getAllNotesController = async (req, res) => {
    try {
        const result = await getNotesTable()
        res.status(200).json({message: 'Displayed Row', data: result})
    } catch (err) {
        if (err.message === 'Data Not Found'){
            res.status(404).send('Error message: Notes data none exist in notes table')
        }
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const getNotesByIdController = async (req, res) => {
    const id = req.params.id

    if(!id) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await getNotesById(id)
        res.status(200).json({message: 'Dispalyed Row', data: result})
    } catch (err){
        if (err.message === 'id not found'){
            res.status(404).send('Error message: notes id not found in notes table')
        }
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const createNotesController = async (req, res) => {
    const {title,body,status_id} = req.body

    if(!title || !status_id) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await createNotes(title,body,status_id)
        res.status(200).json({message: 'Created Row', data: result})
    } catch (err) {
        if (err.message === 'Creation Failed'){
            res.status(404).send('Error message: notes creation failed in notes table')
        } else {
            res.status(500).send({message: `Error Occured: ${err.message}`})
        }
        
    }
}

const updateNotesController = async (req, res) => {
    const {title, body, status_id, id } = req.body

    if(!title || !status_id || !id) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await updateNotes(title,body,status_id,id)
        res.status(200).json({message: 'Updated Row', data: result})
    } catch (err) {
        console.log('Error catched in updateNotesController: ', err)
        if (err.message === 'Update Failed'){
            res.status(404).send('Error message: update notes rows failed in notes table')
        } else {
            res.status(500).send({message: `Error Occured: ${err.message}`})
        }
        
    }
}

const deleteNotesController = async (req,res) => {
    const id = req.params.id

    if(!id) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
         const result = await deleteNotes(id)
         res.status(200).json({message: 'Deleted Row', data: result})
    } catch (err){
        if (err.message === 'Notes none exist'){
            res.status(404).send('Error message: Delete target none exist, deletion failed.')
        } else {
            res.status(500).send({message: `Error Occured: ${err.message}`})
        }
    }
}

module.exports = {
    getAllNotesController,
    getNotesByIdController,
    createNotesController,
    updateNotesController,
    deleteNotesController
}