import { LoadAccountByTokenRepository } from '@/data/protocols'
import { AccountModel } from './models'

export class AccountMongoRepository implements LoadAccountByTokenRepository {
    async load(data: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result | null> {
        const result = await AccountModel.findOne(data).lean()
        return result
    }
}
