import { success } from '@/domain/protocols'
import { GetActuator } from '@/domain/usecases'

export class GetActuatorSpy implements GetActuator {
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

    async handle(actuatorIdentification: string): Promise<any> {
        this.params = actuatorIdentification
        return this.result
    }
}
