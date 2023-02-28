import { GetActuator } from '@/domain/usecases'
import { GetActuatorRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbGetActuator implements GetActuator {
    constructor(
        private readonly getActuatorRepository: GetActuatorRepository
    ) { }

    async handle(actuatorIdentification: string): Promise<Either<ApplicationError, GetActuator.Result>> {
        const actuator = await this.getActuatorRepository.get(actuatorIdentification)
        if (!actuator) {
            const appError = new ApplicationError(
                Constants.NotFoundActuator.error,
                Constants.NotFoundActuator
            )
            return error(appError)
        }
        return success(actuator)
    }
}
