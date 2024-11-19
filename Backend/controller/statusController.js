const { getStatusTable, getStatusById, createStatus,deleteStatus, updateStatus } = require('../model/statusModel')

const getAllStatusController = async (req, res) => {
    try {
        const result = await getStatusTable()
        res.status(201).json({message: 'Displayed row', data: result})
    } catch (err){
        if(err.message === 'No data Found'){
            return res.status(404).send('No status data found')
        } 
        res.status(500).send({message: `Error Occured:  ${err.message}`})
    }
}

const getStatusByIdController = async (req, res) => {
    const id = req.params.id

    if (!id)  return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await getStatusById(id)
        res.status(201).json({message: 'Displayed row', data: result})
    } catch (err) {
        if (err.message === 'Status id not found'){
            return res.status(404).send('Status id not found')
        }
        res.status(500).send({message: `Error Occured:  ${err.message}`})
    }
}

const createStatusController = async (req, res) => {
    const status = req.body.status

    if(!status) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await createStatus(status)
        res.status(201).json({message: 'Created row', data: result})
    } catch (err) {
        if (err.message === 'Add new status failed'){
            return res.status(404).send({message: 'no new status found'})
        }
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const deleteStatusController = async (req, res) => {
    const id = req.params.id

    if(!id) return res.status(400).send({message: 'Validation: Missing reuqired field'})

    try {
        const result = await deleteStatus(id)
        res.status(201).json({message: 'Deleted row', data: result})
    } catch (err) {
        if (err.message === 'Delete status failed'){
            return res.status(404).send({message: 'Database connection issue or status none exist'})
        }
        res.status(500).send({message: `Error Occured: ${err.message}`})
    }
}

const updateStatusController = async (req, res) => {
    const{status, id} = req.body

    if(!status || !id) return res.status(400).send({message: 'Validation: Missing required field'})

    try {
        const result = await updateStatus(status,id)
        res.json({message: 'Updated row', data: result})
    } catch (err) {
        if (err.message === 'Update status failed'){
            return res.status(404).send({message: 'target id not found in database'})
        } 
        res.status(505).send({message: `Error Occured: ${err.message}`})
    }
}

module.exports = {
    getAllStatusController,
    getStatusByIdController,
    createStatusController,
    deleteStatusController,
    updateStatusController
}


