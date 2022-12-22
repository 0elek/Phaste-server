import express from 'express'
import respond from './utils/respond'
import prisma from './utils/prismaClient'


const app = express()
const port = 3333

// prosma 
prisma.paste.count().then((count) => {
    console.log(`[database]: Connected to database. There are ${count} pastes in the database`)
})

prisma.paste.findFirst().then((note) => {
    console.log(note)
})

app.get('/', (req, res) => {
    res.send('Phaste');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});