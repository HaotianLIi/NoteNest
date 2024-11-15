const { getStatusTable, getStatusById, createStatus,deleteStatus, updateStatus } = require('../model/statusModel')


const getAllStatusController = async (req, res) => {
    try {
        const result = await getStatusTable()
        res.json(result)
    } catch (err){
        console.error('Error Catched in getAllStatusController: ', err.message)
        if(err.message === 'No data Found'){
            res.status(404).send('No status data found')
        } 
        res.status(500).send(`Error message:  ${err.message}`)
    }
}

const getStatusByIdController = async (req, res) => {
    const id = req.params.id
    try {
        const result = await getStatusById(id)
        res.json(result)
    } catch (err) {
        console.log('Error Catched in getStatusByIdController: ', err)
        if (err.message === 'Status id not found'){
            res.status(404).send('Status id not found')
        }
        res.status(500).send(`Error message: ${err.message}`)
    }
}

const createStatusController = async (req, res) => {
    const status = req.body.status
    try {
        const result = await createStatus(status)
        console.log('Create successfully: ', result)
        res.json(result)
    } catch (err) {
        if (err.message === 'add new status failed'){
            res.status(404).send({message: 'no new status found'})
        } else {
            console.log(req.body)
            res.status(500).send({message: `${err.message}`})
        }
    }
}

const deleteStatusController = async (req, res) => {
    const id = req.params.id
    try {
        const result = await deleteStatus(id)
        console.log(`Status Deleted, ID: ${result.rows[0].id}, Status: ${result.rows[0].status}`)
        res.json(`Status Deleted ${result}`)
    } catch (err) {
        if (err.message === 'status none exist'){
            res.status(404).send({message: 'selected status none exist'})
        } else {
            res.status(500).send({message: `${err.message}`})
        }
    }
}

const updateStatusController = async (req, res) => {
    const{status, id} = req.body
    try {
        const result = await updateStatus(status,id)
        res.json(result)
    } catch (err) {
        if (err.message === 'Update id not found'){
            res.status(404).send({message: 'target id not found in database'})
        } else {
            res.status(505).send({message: `${err.message}`})
        }
    }
}

module.exports = {
    getAllStatusController,
    getStatusByIdController,
    createStatusController,
    deleteStatusController,
    updateStatusController
}


