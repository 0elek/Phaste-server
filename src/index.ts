import express from 'express'
import bodyparser from 'body-parser'

// utils
import prisma from './utils/prismaClient'
// routes
import create from './route/create'
import id from './route/id'

const app = express()
const port = 3333

prisma.paste.count().then((count) => {
    console.log(`[database]: Connected to database. There are ${count} pastes in the database`)
})
// add bodyparser
app.use(bodyparser.text())


app.get('/', (req, res) => {
    res.send('Phaste');
});
app.use('/create', create);
// it is not working becouse we are using /id/id
app.use('/id', id);

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});