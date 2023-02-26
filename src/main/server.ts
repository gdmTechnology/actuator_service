import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'
import { setupKafka } from './config/kafka'

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        await setupKafka()
        const { setupApp } = await import('./config/app')
        const app = await setupApp()
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
    .catch(console.error)
