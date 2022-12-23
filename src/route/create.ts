import { Router } from 'express';
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';
import z from 'zod';
import { id } from '../utils/idGenerator';

const router = Router();

router.get('/', async (req, res) => {

const contnetSchema = z.string().min(1).max(10000000);
const titleSchema = z.string().max(1000).optional();


    try {contnetSchema.parse(req.body)} catch (err) {
        respond(res, 400, 'Invalid content');
        return;
    }
    try {titleSchema.parse(req.headers.title)} catch (err) {
        respond(res, 400, 'Invalid title');
        return;
    }

    const content = Buffer.from(req.body).toString('base64');
    

    const paste = await prisma.paste.create({
        data: {
            id: await id(),
            authorIp: req.ip,
            content: content,
            createdAt: new Date(),
            title: 'Untitled'
        }
    }).then(paste => {
        respond(res, 200, paste.id);
    })

})

export { router as default };