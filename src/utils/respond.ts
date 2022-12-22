import {Response } from 'express'

export default function respond(res: Response, status: number, message: string, type : string = 'text') {
    if (type === 'json') {
        res.status(status).json({message: message})
    }
    if (type === 'text') {
        res.status(status).send(message)
    }
} 