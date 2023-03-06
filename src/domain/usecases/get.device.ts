import { Either, ApplicationError } from '@/domain/protocols'

export interface GetDevice {
    handle: (deviceIdentification: string) => Promise<Either<ApplicationError, GetDevice.Result>>
}

export namespace GetDevice {
    export type Result = boolean
}
