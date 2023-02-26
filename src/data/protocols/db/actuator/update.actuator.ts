import { UpdateActuator } from '@/domain/usecases'

export interface UpdateActuatorRepository {
    update: (data: UpdateActuatorRepository.Params) => Promise<UpdateActuatorRepository.Result>
}

export namespace UpdateActuatorRepository {
    export type Params = UpdateActuator.Params
    export type Result = UpdateActuator.Result | null
}
