import express = require('express');
import bodyParser from "body-parser";
import cors from 'cors';
import { TreeController } from './tree'
import bootstrap from './bootstrap'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser());

const PORT = process.env.PORT || 3000;

bootstrap()
app.get("/node", TreeController.getNode)

app.get('/reset', TreeController.resetTree)

app.get("/tree", TreeController.getTree)

app.post("/tree", TreeController.applyTree)

app.listen(PORT, () => {     
    console.log(`Server is running in http://localhost:${PORT}`)
})