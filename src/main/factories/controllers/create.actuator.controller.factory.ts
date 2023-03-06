import { CreateActuatorController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeCreateActuator, makeLogControllerDecorator, makeCreateActuatorValidation, makeGetDevice } from '@/main/factories'

export const makeCreateActuatorController = (): Controller => {
    const controller = new CreateActuatorController(makeCreateActuatorValidation(), makeCreateActuator(), makeGetDevice())
    return makeLogControllerDecorator(controller)
}
