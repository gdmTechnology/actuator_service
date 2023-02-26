import { CreateActuator } from '@/domain/usecases'
import { SaveActuatorRepository, CreateUuid } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbCreateActuator implements CreateActuator {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly saveActuatorRepository: SaveActuatorRepository
    ) { }

    async handle(data: CreateActuator.Params): Promise<Either<ApplicationError, CreateActuator.Result>> {
        const actuatorIdentification = this.createUuid.create()
        const actuator = await this.saveActuatorRepository.save({ ...data, actuatorIdentification })
        if (!actuator) {
            const appError = new ApplicationError(
                Constants.DuplicateError.error,
                Constants.DuplicateError
            )
            return error(appError)
        }
        return success(actuator)
    }
}
