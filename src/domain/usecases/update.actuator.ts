import { Either, ApplicationError } from '@/domain/protocols'

export interface UpdateActuator {
    handle: (data: UpdateActuator.Params) => Promise<Either<ApplicationError, UpdateActuator.Result>>
}

export namespace UpdateActuator {
    export type Params = {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId?: string
        actuatorName?: string
        actuatorCurrentValue?: number
        actuatorValue?: number
        actuatorTimeStamp?: string
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
