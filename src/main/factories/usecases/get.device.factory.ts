import { GetDevice } from '@/domain/usecases'
import { DbGetDevice } from '@/data/usecases'
import { DeviceMongoRepository } from '@/infra/db/mongodb'

export const makeGetDevice = (): GetDevice => {
    const deviceMongoRepository = new DeviceMongoRepository()
    return new DbGetDevice(deviceMongoRepository)
}
