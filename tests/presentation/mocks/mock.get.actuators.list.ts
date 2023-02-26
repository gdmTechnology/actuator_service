import { success } from '@/domain/protocols'
import { GetActuatorsList } from '@/domain/usecases'

export class GetActuatorsListSpy implements GetActuatorsList {
    params = null
    result = success([{
        actuatorIdentification: 'actuatorIdentification',
        actuatorTenantId: 'actuatorTenantId',
        actuatorName: 'actuatorName',
        actuatorEquipment: 'actuatorEquipment',
        actuatorMeasureType: 'actuatorMeasureType',
        actuatorCurrentValue: 0,
        actuatorTimeStamp: 'actuatorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }])

    async handle(tenantId: string): Promise<any> {
        this.params = tenantId
        return this.result
    }
}
