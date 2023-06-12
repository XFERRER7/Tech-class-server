import { FastifyInstance } from "fastify";
import { client } from "../lib/client";


export async function wordsRoute(app: FastifyInstance) {
  
  app.get('/word/get-all', async (request, reply) => {

    const words = await client.word.findMany({
      select: {
        id: true,
        text: true,
      }
    })
  
    return words

  })     
  
  app.get('/word/get-all-details', async () => {
    
    const words = await client.word.findMany({
      select: {
        id: true,
        text: true,
        phrase: {
          select: {
            id: true,
            text: true,
          }
        },
        translations: {
          select: {
            id: true,
            text: true,
          }
        }
      }
    })

    return words

  })

}