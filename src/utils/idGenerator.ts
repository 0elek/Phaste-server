import prisma from "./prismaClient";
import config from "../../config";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
const length = 4;
export const id = async () => {
  let fail = 0
  if (config.logging.id) console.time('id')
  let id = "";
  for (let i = 0; i < length; i++) {
    id = id + alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  while (await prisma.paste.findUnique({ where: { id } })) {
    fail++;
    id = "";

    for (let i = 0; i < length; i++) {
      id = id + alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }

  if (config.logging.id) {
    console.timeEnd('id')
    fail > 0 ? console.error(fail) : null;
  }
  return id;
}

/*
Use a faster random number generator.
Pre-generate and store a large number of random strings in an array.
Keep track of a pool of unused strings and only generate new ones when necessary.
*/