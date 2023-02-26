import { success } from '@/domain/protocols'
import { CreateActuator } from '@/domain/usecases'

export class CreateActuatorSpy implements CreateActuator {
    params = null
    result = success({
        actuatorIdentification: 'actuatorIdentification',
        actuatorTenantId: 'actuatorTenantId',
        actuatorName: 'actuatorName',
        actuatorEquipment: 'actuatorEquipment',
        actuatorMeasureType: 'actuatorMeasureType',
        actuatorCurrentValue: 0,
        actuatorTimeStamp: 'actuatorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    })

    async handle(data: CreateActuator.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
