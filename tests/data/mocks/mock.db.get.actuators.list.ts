import { GetActuatorsListRepository } from '@/data/protocols'

export class GetActuatorsListRepositorySpy implements GetActuatorsListRepository {
    params: any
    result: any = [{
        accountId: 'accountId',
        actuatorIdentification: 'actuatorIdentification',
        actuatorTenantId: 'actuatorTenantId',
        actuatorName: 'actuatorName',
        actuatorEquipment: 'actuatorEquipment',
        actuatorMeasureType: 'actuatorMeasureType',
        actuatorCurrentValue: 0,
        actuatorTimeStamp: 'actuatorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }]

    async list(tenantId: string): Promise<GetActuatorsListRepository.Result[]> {
        this.params = tenantId
        return this.result
    }
}
