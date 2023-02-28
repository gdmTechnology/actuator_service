import { GetActuatorsList } from '@/domain/usecases'
import { Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '../helpers'

export class GetActuatorsListController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getActuatorsList: GetActuatorsList
    ) { }

    async handle({ actuatorTenantId }): Promise<any> {
        try {
            const error = this.validation.validate({ actuatorTenantId })
            if (error) return badRequest(error)
            const actuatorsList = await this.getActuatorsList.handle(actuatorTenantId)
            if (actuatorsList.isError()) return badRequest(actuatorsList.value.details)
            return ok(actuatorsList.value)
        } catch (error) {
            return serverError(error)
        }
    }
}
