import express from 'express'
import bodyparser from 'body-parser'

// config
import config from '../config'

// utils
import prisma from './utils/prismaClient'
// routes
import create from './route/create'

import id from './route/id'
import idId from './route/id:id'

const app = express()
const port = config.port

prisma.paste.count().then((count) => {
    console.log(`[database]: Connected to database. There are ${count} pastes in the database`)
})
// add bodyparser
app.use(bodyparser.text())


app.get('/', (req, res) => {
    res.send('Phaste');
});
app.use('/create', create);
app.use('/id', id);
app.use('/id/', idId);

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});