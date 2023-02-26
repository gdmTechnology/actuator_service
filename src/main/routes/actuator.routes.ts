import { adaptRoute } from '@/main/adapters'
import {
    makeCreateActuatorController,
    makeUpdateActuatorController,
    makeGetActuatorsListController,
    makeGetActuatorController
} from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/actuator', auth, adaptRoute(makeCreateActuatorController()))
    router.put('/actuator/:actuatorIdentification', auth, adaptRoute(makeUpdateActuatorController()))
    router.get('/actuator', auth, adaptRoute(makeGetActuatorsListController()))
    router.get('/actuator/:actuatorIdentification', auth, adaptRoute(makeGetActuatorController()))
}
