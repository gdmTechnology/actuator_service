import { GetActuatorRepository } from '@/data/protocols'

export class GetActuatorRepositorySpy implements GetActuatorRepository {
    params: any
    result: any = {
        accountId: 'accountId',
        actuatorIdentification: 'actuatorIdentification',
        actuatorTenantId: 'actuatorTenantId',
        actuatorName: 'actuatorName',
        actuatorCurrentValue: 0,
        actuatorTimeStamp: 'actuatorTimeStamp',
        createdAt: 'createdAt',
        updateddAt: 'updateddAt'
    }

    async get(actuatorIdentification: string): Promise<GetActuatorRepository.Result> {
        this.params = actuatorIdentification
        return this.result
    }
}
