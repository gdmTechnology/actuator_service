import { GetActuatorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeGetActuator, makeLogControllerDecorator, makeGetActuatorValidation } from '@/main/factories'

export const makeGetActuatorController = (): Controller => {
    const controller = new GetActuatorController(makeGetActuatorValidation(), makeGetActuator())
    return makeLogControllerDecorator(controller)
}
