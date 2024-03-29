import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetActuatorsListValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['actuatorTenantId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
