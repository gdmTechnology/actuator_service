
import { ActuatorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const throwError = (): never => {
    throw new Error()
}
const makeSut = (): ActuatorMongoRepository => {
    return new ActuatorMongoRepository()
}

const createActuatorParams = (): ActuatorMongoRepository.Params => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    actuatorTenantId: 'actuatorTenantId',
    actuatorIdentification: 'actuatorIdentification',
    actuatorName: 'actuatorName',
    actuatorCurrentValue: 0,
    actuatorTimeStamp: 'actuatorMeasureType'
})

describe('ActuatorMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('save()', () => {
        test('Should return an actuator on success', async () => {
            const sut = makeSut()
            const params = createActuatorParams()
            const actuator = await sut.save(params)
            expect(actuator).toBeDefined()
        })
    })

    describe('update()', () => {
        test('Should return a actuator updated on success', async () => {
            const sut = makeSut()
            const params = createActuatorParams()
            const actuator = await sut.save(params)
            const { actuatorIdentification, accountId, deviceIdentification } = actuator
            const actuatorUpdated = await sut.update({ deviceIdentification, accountId, actuatorIdentification, actuatorName: 'actuatorNameUpdated' })
            expect(actuatorUpdated.actuatorName).toBe('actuatorNameUpdated')
        })

        test('Should return null if update() fails', async () => {
            const sut = makeSut()
            const params = createActuatorParams()
            const result = await sut.update({ ...params, actuatorIdentification: '' })
            expect(result).toBeNull()
        })

        test('Should throw if update() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createActuatorParams()
            const promise = sut.update(params)
            await expect(promise).rejects.toThrow()
        })
    })

    describe('list()', () => {
        test('Should return a list of actuators on success', async () => {
            const sut = makeSut()
            const params = createActuatorParams()
            await sut.save(params)
            const actuatorsList = await sut.list(params.actuatorTenantId)
            expect(actuatorsList.length).toBe(1)
        })

        test('Should return empty array if list() fails', async () => {
            const sut = makeSut()
            const result = await sut.list('any_tenantId')
            expect(result.length).toBe(0)
        })

        test('Should throw if list() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createActuatorParams()
            const promise = sut.list(params.actuatorTenantId)
            await expect(promise).rejects.toThrow()
        })
    })

    describe('get()', () => {
        test('Should return an actuator on success', async () => {
            const sut = makeSut()
            const params = createActuatorParams()
            const actuator = await sut.save(params)
            const actuatorsList = await sut.get(actuator.actuatorIdentification)
            expect(actuatorsList).toHaveProperty('actuatorIdentification')
        })

        test('Should return null if get() fails', async () => {
            const sut = makeSut()
            const result = await sut.get('any_actuatorIdentification')
            expect(result).toBeNull()
        })

        test('Should throw if get() throws', async () => {
            const sut = makeSut()
            jest.spyOn(sut, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(throwError)))
            const params = createActuatorParams()
            const promise = sut.get(params.actuatorIdentification)
            await expect(promise).rejects.toThrow()
        })
    })
})
