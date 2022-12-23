import express from "express";
import respond from '../utils/respond';
import prisma from '../utils/prismaClient';

const router = express.Router()

router.get('/', (req, res) => {
    const id: any = req.headers.id
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
        console.log(paste?.content)
        if (!paste) {
            respond(res, 400, 'No paste with this id')
            return
        }
        res.setHeader('title', paste.title)
        respond(res, 200, paste.content, "text")
        
    })
})

export { router as default};
