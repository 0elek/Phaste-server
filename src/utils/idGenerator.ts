import { randomBytes } from "crypto";
import prisma from "./prismaClient";

export const id = async () => {
    let id = randomBytes(6).toString("hex").slice(0, 4);
    while (await prisma.paste.findUnique({ where: { id } })) {
        id = randomBytes(3).toString("hex").slice(0, 4);
        console.log("id already exists, generating new id", id);
    }
    return id;
}
