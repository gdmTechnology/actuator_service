import request from 'supertest'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'
import { MongoTestDbHelper } from '@/tests/infra/db/db.handler'
import { DeviceMongoRepository } from '@/infra/db/mongodb'
import { AccountModel, ActuatorModel } from '@/infra/db/mongodb/models'

let app: Express

const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkZW50aWZpY2F0aW9uIiwiaWF0IjoxNjgyMjk3OTYyfQ.oMqQCJOwsWr2gkf46O_X5wSLIvvivGoZkA9nyenkSjw'
const hashedPassword = '$2b$12$cVkcsM1DhD6TSK5NSG5HWetKmyQzvpwexhFfRnUMoRSX9rVGg4Nva'

const addAccountParams = (): any => ({
    email: 'any_email@gmail.com',
    tenant: 'tenantId',
    password: hashedPassword,
    passwordConfirmation: hashedPassword,
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: validJwtToken,
    role: null
})

const addDeviceParams = (): any => ({
    accountId: 'accountId',
    deviceTenantId: 'deviceTenantId',
    deviceIdentification: 'deviceIdentification',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})

const actuatorParms = (): any => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorTenantId: 'actuatorTenantId',
    actuatorName: 'actuatorName',
    actuatorCurrentValue: 0,
    actuatorTimeStamp: 'actuatorTimeStamp'
})

const createAccount = async (val): Promise<any> => {
    const model = new AccountModel(val)
    const acc = await model.save()
    return acc
}

const makeSutDevice = (): DeviceMongoRepository => {
    return new DeviceMongoRepository()
}

const createDevice = async (): Promise<any> => {
    const params = addDeviceParams()
    const device = await makeSutDevice().save(params)
    return device
}

const createActuator = async (val): Promise<any> => {
    const model = new ActuatorModel(val)
    const actuator = await model.save()
    return actuator
}

describe('Actuator Routes', () => {
    beforeAll(async () => {
        app = await setupApp()
        await MongoTestDbHelper.connect()
    })
    beforeEach(async () => {
        await createDevice()
        await createAccount(addAccountParams())
    })
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('POST /actuator', () => {
        test('Should return 200 if succeds', async () => {
            const actuator = actuatorParms()
            await request(app)
                .post('/api/actuator')
                .set({ 'x-access-token': validJwtToken })
                .send(actuator)
                .expect(200)
        })

        test('Should return 400 if some requiered params is empty', async () => {
            const actuador = actuatorParms()
            delete actuador.deviceIdentification
            await request(app)
                .post('/api/actuator')
                .set({ 'x-access-token': validJwtToken })
                .send(actuador)
                .expect(400)
        })

        test('Should return 400 if device doesn`t exists', async () => {
            const actuator = actuatorParms()
            await request(app)
                .post('/api/actuator')
                .send({ ...actuator, deviceIdentification: 'invalidDeviceIdentification' })
                .set({ 'x-access-token': validJwtToken })
                .expect(400)
        })

        test('Should return 400 if duplicate', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            const httpResponse = await request(app)
                .post('/api/actuator')
                .set({ 'x-access-token': validJwtToken })
                .send(actuator)
            expect(httpResponse.statusCode).toBe(400)
        })
    })

    describe('PUT /actuator/:actuatorIdentification', () => {
        test('Should return 200 if succeds', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .put('/api/actuator/actuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({ actuatorName: 'New Name', deviceIdentification: 'deviceIdentification' })
                .expect(200)
        })

        test('Should return 400 if some requiered params is empty', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .put('/api/actuator/actuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({ actuatorName: 'New Name' })
                .expect(400)
        })

        test('Should return 400 if actuator not found', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .put('/api/actuator/invalidActuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({ actuatorName: 'New Name' })
                .expect(400)
        })

        test('Should return 400 if duplicate', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await createActuator({ ...actuator, actuatorName: 'name', actuatorIdentification: 'newActuatorIdentification' })
            await request(app)
                .put('/api/actuator/newActuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
                .send({ actuatorName: 'actuatorName' })
                .expect(400)
        })
        test('Should return 401 if invalid token', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .put('/api/actuator/actuatorIdentification')
                .set({ 'x-access-token': '' })
                .send({ actuatorName: 'actuatorName' })
                .expect(401)
        })
    })

    describe('GET /actuator/list/:actuatorTenantId', () => {
        test('Should return 200 if succeds', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .get('/api/actuator/list/actuatorTenantId')
                .set({ 'x-access-token': validJwtToken })
                .expect(200)
        })

        test('Should return 200 with empty array if actuatorTenantId not found', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            const httpResponse = await request(app)
                .get('/api/actuator/list/invalidActuatorTenantId')
                .set({ 'x-access-token': validJwtToken })
            expect(httpResponse.statusCode).toBe(200)
            expect(httpResponse.body).toEqual([])
        })

        test('Should return 401 if invalid token', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            const httpResponse = await request(app)
                .get('/api/actuator/list/actuatorTenantId')
                .set({ 'x-access-token': '' })
            expect(httpResponse.statusCode).toBe(401)
        })
    })
    describe('GET /actuator/:actuatorIdentification', () => {
        test('Should return 200 if succeds', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            await request(app)
                .get('/api/actuator/actuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
                .expect(200)
        })
        test('Should return 401 if invalid token', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            const httpResponse = await request(app)
                .get('/api/actuator/actuatorIdentification')
                .set({ 'x-access-token': '' })
            expect(httpResponse.statusCode).toBe(401)
        })
        test('Should return 400 if invalid actuator identification', async () => {
            const actuator = actuatorParms()
            await createActuator(actuator)
            const httpResponse = await request(app)
                .get('/api/actuator/invalidActuatorIdentification')
                .set({ 'x-access-token': validJwtToken })
            expect(httpResponse.statusCode).toBe(400)
        })
    })
})
