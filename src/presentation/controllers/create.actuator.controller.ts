import { CreateActuator } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class CreateActuatorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly createActuator: CreateActuator
    ) { }

    async handle(data: CreateActuatorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const actuator = await this.createActuator.handle(data)
            if (actuator.isError()) return badRequest(actuator.value.details)
            return ok(actuator.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateActuatorController {
    export interface Request {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
    }
}
