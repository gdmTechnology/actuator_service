import { Either, ApplicationError } from '@/domain/protocols'

export interface GetActuatorsList {
    handle: (tenantId: string) => Promise<Either<ApplicationError, GetActuatorsList.Result[]>>
}

export namespace GetActuatorsList {
    export type Result = {
        accountId: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorEquipment: string
        actuatorMeasureType: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
