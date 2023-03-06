import { success } from '@/domain/protocols'
import { GetDevice } from '@/domain/usecases'

export class GetDeviceSpy implements GetDevice {
    params = null
    result = success(true)

    async handle(deviceIdentification: string): Promise<any> {
        this.params = deviceIdentification
        return this.result
    }
}
