import { SaveActuatorRepository, UpdateActuatorRepository, GetActuatorsListRepository, GetActuatorRepository } from '@/data/protocols'
import { ActuatorModel } from './models'

export class ActuatorMongoRepository implements SaveActuatorRepository, UpdateActuatorRepository, GetActuatorsListRepository, GetActuatorRepository {
    async save(data: SaveActuatorRepository.Params): Promise<SaveActuatorRepository.Result> {
        try {
            const result = await ActuatorModel.create(data)
            if (result.accountId) return result
            return null
        } catch (error) {
            return null
        }
    }

    async update(data: UpdateActuatorRepository.Params): Promise<UpdateActuatorRepository.Result> {
        try {
            const { deviceIdentification, actuatorIdentification, actuatorName, actuatorTimeStamp, actuatorCurrentValue } = data
            const filter = { deviceIdentification, actuatorIdentification }
            const update: any = { actuatorName, actuatorTimeStamp, actuatorCurrentValue }
            actuatorName === undefined && delete update.actuatorName
            actuatorCurrentValue === undefined && delete update.actuatorCurrentValue
            actuatorTimeStamp === undefined && delete update.actuatorTimeStamp
            const option = { new: true }
            const result = await ActuatorModel.findOneAndUpdate(filter, update, option).lean()
            return result
        } catch (error) {
            return error
        }
    }

    async list(actuatorTenantId: string): Promise<GetActuatorsListRepository.Result[]> {
        return await ActuatorModel.find({ actuatorTenantId })
    }

    async get(actuatorIdentification: string): Promise<GetActuatorRepository.Result> {
        return await ActuatorModel.findOne({ actuatorIdentification })
    }
}

export namespace ActuatorMongoRepository {
    export type Params = SaveActuatorRepository.Params
    export type Result = SaveActuatorRepository.Result
}
