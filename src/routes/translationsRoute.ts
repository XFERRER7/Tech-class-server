import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { client } from "../lib/client";


export async function trasnlationsRoute(app: FastifyInstance) {

  app.get('/translation/get-by-word/:wordId', async (request, reply) => {

    const paramsSchema = z.object({
      wordId: z.string().uuid()
    })

    const { wordId } = paramsSchema.parse(request.params)

    const wordExists = await client.word.findUnique({
      where: {
        id: wordId
      }
    })

    if(!wordExists) {
      reply.status(404).send({ message: 'Word not found' })
      return
    }

    const translations = await client.translations.findMany({

      where: {
        wordId: wordId
      },
      select: {
        id: true,
        text: true,
      }

    })

    return translations

  })

  app.post('/translation/create', async (request, reply) => {

    const paramsSchema = z.object({
      wordId: z.string().uuid(),
      text: z.string().min(1).max(255)
    })

    const { text, wordId } = paramsSchema.parse(request.body)

    const word = await client.word.findUnique({
      where: {
        id: wordId
      }
    })

    if(!word) {
      reply.status(404).send({ message: 'Word not found' })
      return
    }

    const translationAlreadyExists = await client.translations.findFirst({
      where: {
        text: text,
        wordId: wordId
      }
    })

    if(translationAlreadyExists?.text === text && translationAlreadyExists?.wordId === wordId) {
      reply.status(409).send({ message: 'Translation already exists' })
      return
    }

    const newTranslation = await client.translations.create({
      data: {
        text: text,
        wordId: wordId
      }
    })

    if(!newTranslation) {
      reply.status(500).send({ message: 'Error creating translation' })
      return
    }

    reply.status(201) 

  })

}