import { CreateActuator } from '@/domain/usecases'

export interface SaveActuatorRepository {
    save: (data: SaveActuatorRepository.Params) => Promise<SaveActuatorRepository.Result>
}

export namespace SaveActuatorRepository {
    export type Params = CreateActuator.Params & { actuatorIdentification: string }
    export type Result = CreateActuator.Result | null
}
