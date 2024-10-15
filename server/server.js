const express = require ('express');
const cors = require('cors');
const events = require('events');
const PORT = 5000;
const OpenAI = require('openai');
const openai = new OpenAI({apiKey:'qweqweqw'})

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "123"})
})

app.get('/get-message', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new-message', (req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200);

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})