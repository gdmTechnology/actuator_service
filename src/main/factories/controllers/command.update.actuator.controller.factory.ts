import { CommandUpdateActuatorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUpdateActuator, makeCommandUpdateActuatorValidation, makeLogControllerDecorator } from '@/main/factories'

export const makeCommandUpdateActuatorController = (): Controller => {
    const controller = new CommandUpdateActuatorController(makeCommandUpdateActuatorValidation(), makeUpdateActuator())
    return makeLogControllerDecorator(controller)
}
