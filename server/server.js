const express = require ('express');
const cors = require('cors');
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "123"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})