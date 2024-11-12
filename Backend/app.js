const express = require('express')
const app = express()
const { getAllStatus } = require('./controller/statusController')
const { getAllNotes } = require('./controller/notesController')

app.get('/', (req,res) =>{
    res.send('Sup')
})

app.get('/status', getAllStatus)
app.get('/notes', getAllNotes)





app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000')
})