import { GetActuatorsList } from '@/domain/usecases'

export interface GetActuatorsListRepository {
    list: (tenantId: string) => Promise<GetActuatorsListRepository.Result[]>
}

export namespace GetActuatorsListRepository {
    export type Result = GetActuatorsList.Result
}
