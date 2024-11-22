const express = require('express')
const app = express()
app.use(express.json()) // now express can parse json for incoming request like req.body

const { getAllStatusController, getStatusByIdController,createStatusController,deleteStatusController, updateStatusController } = require('./controller/statusController')
const { getAllNotesController, getNotesByIdController, createNotesController,updateNotesController,deleteNotesController } = require('./controller/notesController')
const { getNotesStatusController, getNoteStatusByIdController} = require('./controller/notesStatusController')

app.get('/', (req, res) => {
    res.send('sup')
});

// Get notes table info
app.get('/notes', getAllNotesController)
app.get('/notes/:id',getNotesByIdController)

//Create update delete notes
app.post('/notes/create',createNotesController)
app.put('/notes/update/:id', updateNotesController)
app.delete('/notes/delete/:id',deleteNotesController)

//Get status table info
app.get('/status', getAllStatusController)
app.get('/status/:id',getStatusByIdController)

//Create update delete status
app.post('/status/create', createStatusController)
app.put('/status/update/', updateStatusController)
app.delete('/status/delete/:id', deleteStatusController)

//Get notes_status table info
app.get('/notes_status', getNotesStatusController)
app.get('/notes_status/:id', getNoteStatusByIdController)


app.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000')
})