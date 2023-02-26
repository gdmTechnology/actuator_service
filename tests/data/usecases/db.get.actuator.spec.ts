import { DbGetActuator } from '@/data/usecases'
import { GetActuatorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    getActuatorRepositorySpy: GetActuatorRepositorySpy
    sut: DbGetActuator
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getActuatorRepositorySpy = new GetActuatorRepositorySpy()
    const sut = new DbGetActuator(getActuatorRepositorySpy)
    return { sut, getActuatorRepositorySpy }
}

const mockRequest = (): string => 'actuatorIdentification'

describe('DbUpdateActuator', () => {
    test('Should call GetActuatorRepositorySpy with correct values', async () => {
        const { sut, getActuatorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getActuatorRepositorySpy.params).toEqual(request)
    })

    test('Should return actuator if GetActuatorRepositorySpy succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if GetActuatorRepositorySpy throws', async () => {
        const { sut, getActuatorRepositorySpy } = makeSut()
        jest.spyOn(getActuatorRepositorySpy, 'get').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if GetActuatorRepositorySpy fails', async () => {
        const { sut, getActuatorRepositorySpy } = makeSut()
        getActuatorRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
