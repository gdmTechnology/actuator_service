import { UpdateActuatorRepository } from '@/data/protocols'

export class UpdateActuatorRepositorySpy implements UpdateActuatorRepository {
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

    async update(params: UpdateActuatorRepository.Params): Promise<UpdateActuatorRepository.Result> {
        this.params = params
        return this.result
    }
}
