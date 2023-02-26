import { UpdateActuator } from '@/domain/usecases'
import { DbUpdateActuator } from '@/data/usecases'
import { ActuatorMongoRepository } from '@/infra/db/mongodb'

export const makeUpdateActuator = (): UpdateActuator => {
    const actuatorMongoRepository = new ActuatorMongoRepository()
    return new DbUpdateActuator(actuatorMongoRepository)
}
