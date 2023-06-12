import fastify from "fastify"
import cors from '@fastify/cors'
import { wordsRoute } from "./routes/wordsRoute"
import { trasnlationsRoute } from "./routes/translationsRoute"

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(wordsRoute)
app.register(trasnlationsRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running on port http://localhost:3000')
})