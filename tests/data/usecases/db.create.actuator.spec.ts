import { DbCreateActuator } from '@/data/usecases'
import { CreateActuator } from '@/domain/usecases'
import { CreateUuidSpy, SaveActuatorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    createUuidSpy: CreateUuidSpy
    saveActuatorRepositorySpy: SaveActuatorRepositorySpy
    sut: DbCreateActuator
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const saveActuatorRepositorySpy = new SaveActuatorRepositorySpy()
    const sut = new DbCreateActuator(createUuidSpy, saveActuatorRepositorySpy)
    return { sut, createUuidSpy, saveActuatorRepositorySpy }
}

const mockRequest = (): CreateActuator.Params => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorTenantId: 'actuatorTenantId',
    actuatorName: 'actuatorName',
    actuatorCurrentValue: 0,
    actuatorTimeStamp: 'actuatorTimeStamp'
})

describe('DbCreateActuator', () => {
    test('Should throw if CreateUuid throws', async () => {
        const { sut, createUuidSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should call SaveActuatorRepository with correct values', async () => {
        const { sut, saveActuatorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(saveActuatorRepositorySpy.params).toEqual({ ...request, actuatorIdentification: 'any_id' })
    })

    test('Should return actuator if SaveActuatorRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if SaveActuatorRepository throws', async () => {
        const { sut, saveActuatorRepositorySpy } = makeSut()
        jest.spyOn(saveActuatorRepositorySpy, 'save').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if SaveActuatorRepository fails', async () => {
        const { sut, saveActuatorRepositorySpy } = makeSut()
        saveActuatorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
