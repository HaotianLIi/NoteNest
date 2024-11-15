const {getNotesTable,getNotesById,createNotes,updateNotes,deleteNotes} = require('../model/notesModel')

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

const createNotesController = async (req, res) => {
    const {title,body,status_id} = req.body
    try {
        const result = await createNotes(title,body,status_id)
        console.log("Created Successfully: ", result)
        res.json(result)
    } catch (err) {
        if (err.message === 'Data not found'){
            res.status(404).send({message: 'notes not found in createNotes'})
        } else {
            res.status(500).send({message: `Error message: ${err.message}`})
        }
        
    }
}

const updateNotesController = async (req, res) => {
    const {title, body, status_id, id } = req.body
    try {
        const result = await updateNotes(title,body,status_id,id)
        console.log("Updated Successfully: ", result.rows)
        res.json(result)
    } catch (err) {
        console.log('Error catched in updateNotesController: ', err)
        if (err.message === 'Data not found'){
            res.status(404).send({message: 'notes not found in updateNotes'})
        } else {
            res.status(500).send({message: `${err.message}`})
        }
        
    }
}

const deleteNotesController = async (req,res) => {
    const id = req.params.id
    try {
         const result = await deleteNotes(id)
         console.log(`Note Deleted: ID ${result.rows[0].id}, Title: ${result.rows[0].title}`);
         res.json(result.rows)
    } catch (err){
        if (err.message === 'Notes none exist'){
            res.status(404).send({message: 'Delete failed, notes not found'})
        } else {
            res.status(500).send({message: `${err.message}`})
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