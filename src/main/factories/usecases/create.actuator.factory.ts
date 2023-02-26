import { CreateActuator } from '@/domain/usecases'
import { DbCreateActuator } from '@/data/usecases'
import { ActuatorMongoRepository } from '@/infra/db/mongodb'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'

export const makeCreateActuator = (): CreateActuator => {
    const uuidGeneratorAdapter = new UuidGeneratorAdapter()
    const actuatorMongoRepository = new ActuatorMongoRepository()
    return new DbCreateActuator(uuidGeneratorAdapter, actuatorMongoRepository)
}
