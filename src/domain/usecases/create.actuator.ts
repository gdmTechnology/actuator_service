import { Either, ApplicationError } from '@/domain/protocols'

export interface CreateActuator {
    handle: (data: CreateActuator.Params) => Promise<Either<ApplicationError, CreateActuator.Result>>
}

export namespace CreateActuator {
    export type Params = {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
    }

    export type Result = {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
