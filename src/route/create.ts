import { Router } from 'express';
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

const router = Router();

router.get('/create', async (req, res) => {
   
    if (req.headers['content'] === undefined) {
        respond(res, 400, 'No content provided')
        return
    }
    if (req.headers['content'] === '') {
        respond(res, 400, 'No content provided')
        return
    }
    const content = req.headers['content'] as string 
    const paste = await prisma.paste.create({data: {content: content, authorIp: req.ip}})
    respond(res, 200, paste.id, "text")
})

export default router;