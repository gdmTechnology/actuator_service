import { DbUpdateActuator } from '@/data/usecases'
import { UpdateActuator } from '@/domain/usecases'
import { UpdateActuatorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    updateActuatorRepositorySpy: UpdateActuatorRepositorySpy
    sut: DbUpdateActuator
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const updateActuatorRepositorySpy = new UpdateActuatorRepositorySpy()
    const sut = new DbUpdateActuator(updateActuatorRepositorySpy)
    return { sut, updateActuatorRepositorySpy }
}

const mockRequest = (): UpdateActuator.Params => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorTenantId: 'actuatorTenantId',
    actuatorName: 'actuatorName',
    actuatorCurrentValue: 0,
    actuatorTimeStamp: 'actuatorTimeStamp'
})

describe('DbUpdateActuator', () => {
    test('Should call UpdateActuatorRepository with correct values', async () => {
        const { sut, updateActuatorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateActuatorRepositorySpy.params).toEqual(request)
    })

    test('Should return actuator if UpdateActuatorRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if UpdateActuatorRepository throws', async () => {
        const { sut, updateActuatorRepositorySpy } = makeSut()
        jest.spyOn(updateActuatorRepositorySpy, 'update').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if UpdateActuatorRepository fails', async () => {
        const { sut, updateActuatorRepositorySpy } = makeSut()
        updateActuatorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
