import { UpdateActuator } from '@/domain/usecases'
import { UpdateActuatorRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbUpdateActuator implements UpdateActuator {
    constructor(
        private readonly updateActuatorRepository: UpdateActuatorRepository
    ) { }

    async handle(data: UpdateActuator.Params): Promise<Either<ApplicationError, UpdateActuator.Result>> {
        const actuator = await this.updateActuatorRepository.update(data)
        if (!actuator) {
            const appError = new ApplicationError(
                Constants.NotFoundActuator.error,
                Constants.NotFoundActuator.message
            )
            return error(appError)
        }
        return success(actuator)
    }
}
