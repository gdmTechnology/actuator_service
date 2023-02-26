import { UpdateActuatorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeUpdateActuator, makeUpdateActuatorValidation, makeLogControllerDecorator } from '@/main/factories'

export const makeUpdateActuatorController = (): Controller => {
    const controller = new UpdateActuatorController(makeUpdateActuatorValidation(), makeUpdateActuator())
    return makeLogControllerDecorator(controller)
}
