import { ValidationSpy, UpdateActuatorSpy } from '../mocks'
import { CommandUpdateActuatorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    updateActuatorSpy: UpdateActuatorSpy
    sut: CommandUpdateActuatorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const updateActuatorSpy = new UpdateActuatorSpy()
    const sut = new CommandUpdateActuatorController(validationSpy, updateActuatorSpy)
    return {
        validationSpy,
        updateActuatorSpy,
        sut
    }
}

const mockRequest = (): any => ({
    accountId: 'accountId',
    actuatorIdentification: 'actuatorIdentification',
    deviceIdentification: 'deviceIdentification',
    actuatorCurrentValue: 0
})

describe('CommandUpdateActuatorController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
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

    test('Should call UpdateActuator with correct values', async () => {
        const { sut, updateActuatorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        const { actuatorTimeStamp, ...handledPayload } = updateActuatorSpy.params
        expect(handledPayload).toEqual(request)
        expect(updateActuatorSpy.params).toHaveProperty('actuatorTimeStamp')
    })

    test('Should return 400 if UpdateActuator fails', async () => {
        const { sut, updateActuatorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        updateActuatorSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if UpdateActuator succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if UpdateActuator throws', async () => {
        const { sut, updateActuatorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(updateActuatorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
