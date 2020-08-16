import express = require('express');
import { TreeNodeFactory } from './tree-db'
import cors from 'cors';

const app: express.Application = express()

app.use(cors())

const PORT = process.env.PORT || 3000;

app.get("/tree", (req, res) => {
    const tree = new TreeNodeFactory().init()

    res.status(200).json(tree)
})

app.listen(PORT, () => {     
    console.log(`Server is running in http://localhost:${PORT}`)
})