import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect().then(() => {
    console.log('[database]: Connected to database')
}).then(() => {
    console.log('[database]: Disconnected from database')
})
export default prisma