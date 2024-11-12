const { getStatusTable, getStatusById } = require('../model/statusModel')


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

module.exports = {
    getAllStatusController,
    getStatusByIdController
}


