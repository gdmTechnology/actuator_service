import { GetActuator } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class GetActuatorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getActuator: GetActuator
    ) { }

    async handle({ actuatorIdentification }: { actuatorIdentification: string }): Promise<any> {
        try {
            const error = this.validation.validate({ actuatorIdentification })
            if (error) return badRequest(error)
            const actuator = await this.getActuator.handle(actuatorIdentification)
            if (actuator.isError()) return badRequest(actuator.value.details)
            return ok(actuator.value)
        } catch (error) {
            return serverError(error)
        }
    }
}
