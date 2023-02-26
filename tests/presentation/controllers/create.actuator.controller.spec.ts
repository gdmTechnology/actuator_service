import { ValidationSpy, CreateActuatorSpy } from '../mocks'
import { CreateActuatorController } from '@/presentation/controllers'
import { ApplicationError, error } from '@/domain/protocols'
const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    createActuatorSpy: CreateActuatorSpy
    sut: CreateActuatorController
}

const mockSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createActuatorSpy = new CreateActuatorSpy()
    const sut = new CreateActuatorController(validationSpy, createActuatorSpy)
    return {
        validationSpy,
        createActuatorSpy,
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
})
