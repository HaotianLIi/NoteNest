const { getStatusTable, getStatusById, createStatus,deleteStatus, updateStatus } = require('../model/statusModel')

const getAllStatusController = async (req, res) => {
    try {
        const result = await getStatusTable()
        if(!result) {
            return res.status(404).send('No status data found')
        }
        res.status(200).json({message: 'Displayed row', data: result})
    } catch (err){
        res.status(500).send({message: `Error Occured:  ${err.message}`})
    }
}

const getStatusByIdController = async (req, res) => {
    const id = req.params.notes_id
    if (!id) {
        return res.status(400).send({message: 'Validation: Missing required field'})
    }
    // Only starting the interaction with the database after confirmed the use input is valid
    try {
        const result = await getStatusById(id)
        if(!result){
            return res.status(404).sned({message: 'id not found'})
        }
        res.status(200).json({message: 'Displayed row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured:  ${err.message}`})
    }
}

const createStatusController = async (req, res) => {
    const status = req.body.status
    if(!status) {
        return res.status(400).send({message: 'Validation: Missing status required field'})
    }

    try {
        const result = await createStatus(status)
        if(!result){
            return res.status(404).send({message: 'no new status found'})
        }
        res.status(201).json({message: 'Created row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const deleteStatusController = async (req, res) => {
    const id = req.params.id
    if(!id) {
        return res.status(400).send({message: 'Validation: Missing reuqired field'})
    }

    try {
        const result = await deleteStatus(id)
        if(!result){
            return res.status(404).send({message: 'delete content not found'})
        }
        res.status(200).json({message: 'Deleted row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const updateStatusController = async (req, res) => {
    const{status, id} = req.body
    if(!status || !id) {
        return res.status(400).send({message: 'Validation: Missing required field'})
    }

    try {
        const result = await updateStatus(status,id)
        if(!result){
            return res.status(404).send({message: 'Target id not found in database'})
        }
        res.status(200).json({message: 'Updated row', data: result})
    } catch (err) {
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

module.exports = {
    getAllStatusController,
    getStatusByIdController,
    createStatusController,
    deleteStatusController,
    updateStatusController
}


