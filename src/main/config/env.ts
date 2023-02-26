export default {
  port: process.env.PORT || 3003,
  jwtSecret: process.env.JWT_SECRET || '1kZDnw8==jh',
  mongoUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin` || 'mongodb://rem:rem2023@mongo:27017/rem?authSource=admin',
  adminEmail: process.env.ADMIN_EMAIL || 'gui.acassemiro@gmail.com',
  mongoHost: process.env.MONGO_HOST || 'mongo',
  mongoPort: process.env.MONGO_PORT || 27017,
  mongoDbName: process.env.MONGO_DB_NAME || 'rem',
  mongoPass: process.env.MONGO_PASS || 'rem2023',
  mongoUser: process.env.MONGO_USER || 'rem',
  kafkaClientId: process.env.KAFKA_CLIENTID || 'rem-kafka',
  kafkaBrokerPort: process.env.KAFKA_BROKER_PORT || 9092,
  kafkaBrokerHost: process.env.KAFKA_BROKER_HOST || 'broker',
  kafkaGroupId: process.env.KAFKA_GROUP_ID || 'sensor-service'
}
