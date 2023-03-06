import { GetDevice } from '@/domain/usecases'
import { GetDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbGetDevice implements GetDevice {
    constructor(
        private readonly getDeviceRepository: GetDeviceRepository
    ) { }

    async handle(deviceIdentification: string): Promise<Either<ApplicationError, GetDevice.Result>> {
        const device = await this.getDeviceRepository.get(deviceIdentification)
        if (!device) {
            const appError = new ApplicationError(
                Constants.NotFoundDevice.error,
                Constants.NotFoundDevice
            )
            return error(appError)
        }
        return success(device)
    }
}
