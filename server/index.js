const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3333;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: "hi there"});
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
