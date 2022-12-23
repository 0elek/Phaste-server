import express from "express";
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

const router = express.Router()

router.get('/:id', (req, res) => {
    const id: any = req.params.id
    console.log(id)
    if (id === undefined) { 
        respond(res, 400, 'No id provided')
        return
    }
    const paste = prisma.paste.findUnique({
        where: {
            id: id
        }
    }).then(paste=>{
        if (!paste) {
            respond(res, 400, 'No paste with this id')
            return
        }
        res.setHeader('title', paste.title)
        res.setHeader('created-at', paste.createdAt.toDateString())
        respond(res, 200, Buffer.from(paste.content, 'base64').toString('utf-8'), 'text')
        
    })
})

export { router as default};
