import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaConsumer } from '@/infra/kafka'

export const setupKafka = async (): Promise<void> => {
    const kafkaServer = new Kafka({
        clientId: env.kafkaClientId,
        brokers: [`${env.kafkaBrokerHost}: ${env.kafkaBrokerPort}`]
    })
    const kafkaConsumer = new KafkaConsumer(kafkaServer)
    await kafkaConsumer.consumer()
}
