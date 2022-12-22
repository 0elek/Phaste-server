import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

const port = 3333

prisma.$connect().then(() => {
    console.log('[database]: Connected to database')
})

function respond(res: express.Response, status: number, message: string, type : string = 'text') {
    if (type === 'json') {
        res.status(status).json({message: message})
    }
    if (type === 'text') {
        res.status(status).send(message)
    }
}

app.get('/', (req, res) => {
    res.send('Phaste');
});

app.get('/id', async (req, res) => {
    
    if (req.headers['id'] === undefined) {
        respond(res, 400, 'No id provided')
        return
    }
    if (req.headers['id'] === '') {
        respond(res, 400, 'No id provided')
        return
    }
    const id = req.headers['id'] as string 
    
    const paste = await prisma.paste.findUnique({where: {id: id}})
    if (paste?.content === undefined) {
        respond(res, 404, 'Paste not found', 'text')
        return
    }
    respond(res, 200, paste.content, "json")
})
app.get ('/create', async (req, res) => {
    if(req.headers['content-type'] != "application/json") {
        respond(res, 400, 'Content-Type must be application/json')
        return
    }
    const content = req.body 
    const title = req.headers['title'] as string
    const paste = await prisma.paste.create({data: {content: "a", title: title, authorIp: req.ip}})
    respond(res, 200, paste.id, 'json')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});