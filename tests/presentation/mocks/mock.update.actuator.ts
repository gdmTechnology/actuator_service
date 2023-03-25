import { success } from '@/domain/protocols'
import { UpdateActuator } from '@/domain/usecases'

export class UpdateActuatorSpy implements UpdateActuator {
    params = null
    result = success({
        actuatorIdentification: 'actuatorIdentification',
        actuatorTenantId: 'actuatorTenantId',
        actuatorName: 'actuatorName',
        actuatorCurrentValue: 0,
        actuatorTimeStamp: 'actuatorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    })

    async handle(data: UpdateActuator.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
