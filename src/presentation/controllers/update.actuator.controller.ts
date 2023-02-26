import { UpdateActuator } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class UpdateActuatorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateActuator: UpdateActuator
    ) { }

    async handle(data: UpdateActuatorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const actuator = await this.updateActuator.handle(data)
            if (actuator.isError()) return badRequest(actuator.value.details)
            return ok(actuator.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateActuatorController {
    export interface Request {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId?: string
        actuatorName?: string
        actuatorCurrentValue?: number
        actuatorValue?: number
        actuatorTimeStamp?: string
    }
}
