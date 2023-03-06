import { ValidationSpy, GetActuatorsListSpy } from '../mocks'
import { GetActuatorsListController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    getActuatorsListSpy: GetActuatorsListSpy
    sut: GetActuatorsListController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const getActuatorsListSpy = new GetActuatorsListSpy()
    const sut = new GetActuatorsListController(validationSpy, getActuatorsListSpy)
    return {
        validationSpy,
        getActuatorsListSpy,
        sut
    }
}

const mockRequest = (): any => ({ actuatorTenantId: 'actuatorTenantId' })

describe('GetActuatorsListController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual({ actuatorTenantId: 'actuatorTenantId' })
    })

    test('Should return 400 if validation fails', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call GetActuatorsList with correct values', async () => {
        const { sut, getActuatorsListSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getActuatorsListSpy.params).toEqual('actuatorTenantId')
    })

    test('Should return 400 if GetActuatorsList fails', async () => {
        const { sut, getActuatorsListSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getActuatorsListSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if GetActuatorsList succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if GetActuatorsList throws', async () => {
        const { sut, getActuatorsListSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getActuatorsListSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
