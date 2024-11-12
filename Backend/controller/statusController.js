const express = require('express')
const app = express()
const { getStatusTable } = require('../model/statusModel')


const getAllStatus = async (req, res) => {
    try {
        const result = await getStatusTable()
        res.json(result)
    } catch (err){
        console.error('Error in getAllStatus: ', err.message)
        if(err.message === 'No data Found'){
            res.status(404).send('No status data found')
        } 
        res.status(500).send(`Error message:  ${err.message}`)
    }
}


module.exports = {
    getAllStatus
}


