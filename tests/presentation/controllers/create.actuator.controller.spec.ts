import { ValidationSpy, CreateActuatorSpy, GetDeviceSpy } from '../mocks'
import { CreateActuatorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    createActuatorSpy: CreateActuatorSpy
    getDeviceSpy: GetDeviceSpy
    sut: CreateActuatorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createActuatorSpy = new CreateActuatorSpy()
    const getDeviceSpy = new GetDeviceSpy()
    const sut = new CreateActuatorController(validationSpy, createActuatorSpy, getDeviceSpy)
    return {
        validationSpy,
        createActuatorSpy,
        getDeviceSpy,
        sut
    }
}

const mockRequest = (): any => ({
    actuatorIdentification: 'actuatorIdentification',
    actuatorTenantId: 'actuatorTenantId',
    actuatorName: 'actuatorName',
    actuatorEquipment: 'actuatorEquipment',
    actuatorMeasureType: 'actuatorMeasureType',
    actuatorCurrentValue: 0,
    actuatorTimeStamp: 'actuatorMeasureType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})

describe('ActuatorController', () => {
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

    test('Should call CreateActuator with correct values', async () => {
        const { sut, createActuatorSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(createActuatorSpy.params).toEqual(request)
    })

    test('Should return 400 if CreateActuator fails', async () => {
        const { sut, createActuatorSpy } = mockSut()
        const request = mockRequest()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        createActuatorSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 200 if CreateActuator succeds', async () => {
        const { sut } = mockSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if CreateActuator throws', async () => {
        const { sut, createActuatorSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(createActuatorSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call GetDevice with correct value', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getDeviceSpy.params).toEqual(request.deviceIdentification)
    })

    test('Should return 400 if GetDevice fails', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const appError: ApplicationError = new ApplicationError(
            '',
            ''
        )
        getDeviceSpy.result = error(appError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if GetDevice throws', async () => {
        const { sut, getDeviceSpy } = mockSut()
        const request = mockRequest()
        jest.spyOn(getDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
