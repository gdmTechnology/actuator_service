import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateActuatorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'deviceIdentification', 'actuatorTenantId', 'actuatorName', 'actuatorCurrentValue']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
