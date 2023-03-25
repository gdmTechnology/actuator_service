import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCommandUpdateActuatorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'deviceIdentification', 'actuatorIdentification', 'actuatorCurrentValue']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
