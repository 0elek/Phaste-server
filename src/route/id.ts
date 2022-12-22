import { Router } from "express"
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

const router = Router()

 router.get('/id', async (req, res) => {
    
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