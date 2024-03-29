import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeUpdateActuatorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['actuatorIdentification', 'deviceIdentification']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
