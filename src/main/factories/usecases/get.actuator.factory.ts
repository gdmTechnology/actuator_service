import { GetActuator } from '@/domain/usecases'
import { DbGetActuator } from '@/data/usecases'
import { ActuatorMongoRepository } from '@/infra/db/mongodb'

export const makeGetActuator = (): GetActuator => {
    const actuatorMongoRepository = new ActuatorMongoRepository()
    return new DbGetActuator(actuatorMongoRepository)
}
