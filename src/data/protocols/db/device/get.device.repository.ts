export interface GetDeviceRepository {
    get: (deviceIdentification: string) => Promise<GetDeviceRepository.Result>
}

export namespace GetDeviceRepository {
    export type Result = boolean
}
