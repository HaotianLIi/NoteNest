const express = require('express')
const app = express()
app.use(express.json()) // now express can parse json for incoming request like req.body

const { getAllStatusController, getStatusByIdController,createStatusController,deleteStatusController, updateStatusController } = require('./controller/statusController')
const { getAllNotesController, getNotesByIdController, createNotesController,updateNotesController,deleteNotesController } = require('./controller/notesController')

app.get('/', (req, res) => {
    res.send('sup')
});


app.get('/notes', getAllNotesController)
app.get('/notes/:id',getNotesByIdController)



app.post('/notes/create',createNotesController)
app.put('/notes/update/:id', updateNotesController)
app.delete('/notes/delete/:id',deleteNotesController)

app.get('/status', getAllStatusController)
app.post('/status/create', createStatusController)
app.put('/status/update/', updateStatusController)
app.delete('/status/delete/:id', deleteStatusController)

app.get('/status/:id',getStatusByIdController)

// app.get('/test', (req, res) => {
//     console.log('Test route working')
//     res.send("Test route working");
// });

app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000')
})