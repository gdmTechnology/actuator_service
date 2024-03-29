import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetActuatorValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['actuatorIdentification']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
