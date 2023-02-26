import { GetActuator } from '@/domain/usecases'

export interface GetActuatorRepository {
    get: (actuatorIdentification: string) => Promise<GetActuatorRepository.Result>
}

export namespace GetActuatorRepository {
    export type Result = GetActuator.Result | null
}
