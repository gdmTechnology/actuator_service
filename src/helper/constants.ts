export const Constants = {
    EmailInUseError: 'EmailInUseError',
    NotFoundTenantError: 'NotFoundTenantError',
    Forbidden: 'Forbidden',
    DuplicateError: {
        error: 'DatabaseUniqueConstraintError',
        message: 'Object already exists.',
        code: 11000
    },
    NotFoundActuator: {
        error: 'NotFoundActuatorError',
        message: 'Not found acutuator identification.'
    },
    NotFoundDevice: {
        error: 'NotFoundDevice',
        message: 'Invalid device identification.'
    }
}
