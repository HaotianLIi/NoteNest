const {getNotesTable,getNotesById,createNotes,updateNotes,deleteNotes} = require('../model/notesModel')

const getAllNotesController = async (req, res) => {
    try {
        const result = await getNotesTable()
        if(!result){
            return res.status(404).send({message: 'Error message: Notes data none exist in notes table'})
        }
        res.status(200).json({message: 'Displayed Row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const getNotesByIdController = async (req, res) => {
    const id = req.params.id
    if(!id){
        return res.status(400).send({message: 'Validation: Missing id required field'})
    } 

    try {
        const result = await getNotesById(id)
        if(!result){
            return res.status(404).send('Error message: notes id not found in notes table')
        }
        res.status(200).json({message: 'Dispalyed Row', data: result})
    } catch (err){
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const createNotesController = async (req, res) => {
    const {title, content, status_id} = req.body

    const REQUIRED_FIELD = ['title','content','status_id']
    const MissingField = REQUIRED_FIELD.filter(column => !req.body[column])
    if(MissingField.length > 0){
        return res.status(400).send({message: 'Validation: Missing required field', Missing: MissingField})
    }

    try {
        const result = await createNotes(title,content,status_id)
        if(!result){
            return res.status(404).send('Error message: notes creation failed in notes table')
        }
        res.status(201).json({message: 'Created Row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})
        
    }
}

const updateNotesController = async (req, res) => {
    const {title, content, status_id, id} = req.body

    const REQUIRED_FIELD = ['title','content','status_id','id']
    const MissingField = REQUIRED_FIELD.filter(column => !req.body[column])
    if(MissingField.length > 0){
        return res.status(400).send({message: 'Validation: Missing required filed', missing: MissingField})
    }

    try {
        const result = await updateNotes(title,content,status_id,id)
        if(!result){
            return res.status(404).send('Error message: update notes rows failed in notes table')
        }
        res.status(200).json({message: 'Updated Row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})    
    }
}

const deleteNotesController = async (req,res) => {
    const id = req.params.id
    if(!id) {
        return res.status(400).send({message: 'Validation: Missing id required field'})
    }

    try {
         const result = await deleteNotes(id)
         if(!result){
            return res.status(404).send('Error message: Delete target none exist, deletion failed.')
         }
         res.status(200).json({message: 'Deleted Row', data: result.rows[0]})
    } catch (err){
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

module.exports = {
    getAllNotesController,
    getNotesByIdController,
    createNotesController,
    updateNotesController,
    deleteNotesController
}