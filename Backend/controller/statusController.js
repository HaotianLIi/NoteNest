const express = require('express')
const app = express()
const { getStatus } = require('../model/statusModel')


const getAllStatus = async (req, res) => {
    try {
        const result = await getStatus()
        res.json(result)
    } catch (err){
        console.error('Error in getAllStatus: ', err.message)
        if(err.message === 'No data Found'){
            res.status(404).send('No status data found')
        } else if (err.message === 'Database error'){
            res.status(500).send('Database error occured')
        } else {
            res.status(500).send('Unexpected error occurred')
        }
    }
}


module.exports = {
    getAllStatus
}


