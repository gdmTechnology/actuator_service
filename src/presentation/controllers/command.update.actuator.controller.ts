import { UpdateActuator } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class CommandUpdateActuatorController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateActuator: UpdateActuator
    ) { }

    async handle(data: CommandUpdateActuatorController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            const command = {
                accountId: data.accountId,
                deviceIdentification: data.deviceIdentification,
                actuatorIdentification: data.actuatorIdentification,
                actuatorCurrentValue: data.actuatorCurrentValue,
                actuatorTimeStamp: new Date().toString()
            }
            const actuator = await this.updateActuator.handle(command)
            if (actuator.isError()) return badRequest(actuator.value.details)
            return ok(actuator.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CommandUpdateActuatorController {
    export interface Request {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorCurrentValue: number
    }
}
