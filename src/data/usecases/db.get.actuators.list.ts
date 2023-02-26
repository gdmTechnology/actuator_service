import { GetActuatorsList } from '@/domain/usecases'
import { GetActuatorsListRepository } from '@/data/protocols'
import { ApplicationError, Either, success } from '@/domain/protocols'

export class DbGetActuatorsList implements GetActuatorsList {
    constructor(
        private readonly getActuatorsListRepository: GetActuatorsListRepository
    ) { }

    async handle(tenantId: string): Promise<Either<ApplicationError, GetActuatorsList.Result[]>> {
        const actuators = await this.getActuatorsListRepository.list(tenantId)
        return success(actuators)
    }
}
