import { Router } from 'express';
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

const router = Router();

router.get('/create', async (req, res) => {
    if(req.headers['content-type'] != "application/json") {
        respond(res, 400, 'Content-Type must be application/json')
        return
    }
    const content = req.body 
    const title = req.headers['title'] as string
    const paste = await prisma.paste.create({data: {content: "a", title: title, authorIp: req.ip}})
    respond(res, 200, paste.id, 'json')
})

export default router;