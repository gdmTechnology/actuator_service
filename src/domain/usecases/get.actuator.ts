import { Either, ApplicationError } from '@/domain/protocols'

export interface GetActuator {
    handle: (actuatorIdentification: string) => Promise<Either<ApplicationError, GetActuator.Result>>
}

export namespace GetActuator {
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
