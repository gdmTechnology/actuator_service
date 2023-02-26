import { CreateUuid, SaveActuatorRepository } from '@/data/protocols'

export class CreateUuidSpy implements CreateUuid {
    id = 'any_id'

    create(): string {
        return this.id
    }
}

export class SaveActuatorRepositorySpy implements SaveActuatorRepository {
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

    async save(params: SaveActuatorRepository.Params): Promise<SaveActuatorRepository.Result> {
        this.params = params
        return this.result
    }
}
