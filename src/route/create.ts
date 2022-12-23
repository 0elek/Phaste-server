import { Router } from 'express';
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

import { id } from '../utils/idGenerator';

const router = Router();

router.get('/', async (req, res) => {
    const title: string = req.headers['title'] as string
    const content: string = Buffer.from(req.body).toString('base64');
    if (req.headers['content-type'] !== 'text/plain') {
        respond(res, 400, 'Content-Type must be text/plain');
        return;
    }
    // generate id


    const paste = await prisma.paste.create({
        data: {
            id: await id(),
            authorIp: req.ip,
            content: content,
            createdAt: new Date(),
            title: title ? title : 'Untitled'
        }
    }).then(paste => {
        respond(res, 200, paste.id);

    })

})

export { router as default };