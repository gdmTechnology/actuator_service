import { ValidationSpy, GetActuatorSpy } from '../mocks'
import { GetActuatorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    getActuatorSpy: GetActuatorSpy
    sut: GetActuatorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const getActuatorSpy = new GetActuatorSpy()
    const sut = new GetActuatorController(validationSpy, getActuatorSpy)
    return {
        validationSpy,
        getActuatorSpy,
        sut
    }
}

const mockRequest = (): any => ({ actuatorIdentification: 'actuatorIdentification' })

describe('GetActuatorController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual({ actuatorIdentification: 'actuatorIdentification' })
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

    test('Should call GetActuator with correct values', async () => {
        const { sut, getActuatorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getActuatorSpy.params).toEqual(request.actuatorIdentification)
    })

    test('Should return 400 if GetActuator fails', async () => {
        const { sut, getActuatorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getActuatorSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if GetActuator succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if GetActuator throws', async () => {
        const { sut, getActuatorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getActuatorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
