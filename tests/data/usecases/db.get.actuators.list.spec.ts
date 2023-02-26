import { DbGetActuatorsList } from '@/data/usecases'
import { GetActuatorsListRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    getActuatorsListRepositorySpy: GetActuatorsListRepositorySpy
    sut: DbGetActuatorsList
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getActuatorsListRepositorySpy = new GetActuatorsListRepositorySpy()
    const sut = new DbGetActuatorsList(getActuatorsListRepositorySpy)
    return { sut, getActuatorsListRepositorySpy }
}

const mockRequest = (): string => 'tenantId'

describe('DbGetActuatorsList', () => {
    test('Should call GetActuatorsListRepository with correct values', async () => {
        const { sut, getActuatorsListRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getActuatorsListRepositorySpy.params).toBe('tenantId')
    })

    test('Should return actuator if GetActuatorsListRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
        if (result.isSuccess()) {
            expect(result.value.length).toBeGreaterThanOrEqual(1)
        }
    })

    test('Should throw if GetActuatorsListRepository throws', async () => {
        const { sut, getActuatorsListRepositorySpy } = makeSut()
        jest.spyOn(getActuatorsListRepositorySpy, 'list').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return empty array if GetActuatorsListRepository not found actuators', async () => {
        const { sut, getActuatorsListRepositorySpy } = makeSut()
        getActuatorsListRepositorySpy.result = []
        const request = mockRequest()
        const result = await sut.handle(request)
        if (result.isSuccess()) {
            expect(result.value.length).toBe(0)
        }
    })
})
