import { GetActuatorsList } from '@/domain/usecases'
import { DbGetActuatorsList } from '@/data/usecases'
import { ActuatorMongoRepository } from '@/infra/db/mongodb'

export const makeGetActuatorsList = (): GetActuatorsList => {
    const actuatorMongoRepository = new ActuatorMongoRepository()
    return new DbGetActuatorsList(actuatorMongoRepository)
}
