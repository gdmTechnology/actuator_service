import { GetActuatorsListController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeGetActuatorsList, makeLogControllerDecorator, makeGetActuatorsListValidation } from '@/main/factories'

export const makeGetActuatorsListController = (): Controller => {
    const controller = new GetActuatorsListController(makeGetActuatorsListValidation(), makeGetActuatorsList())
    return makeLogControllerDecorator(controller)
}
