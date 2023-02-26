import mongoose, { Schema } from 'mongoose'

const ActuatorSchema = new Schema({
    accountId: {
        type: String,
        required: true
    },
    deviceIdentification: {
        type: String,
        required: true,
        index: true
    },
    actuatorIdentification: {
        type: String,
        unique: true,
        required: true
    },
    actuatorTenantId: {
        type: String,
        required: true
    },
    actuatorName: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    actuatorCurrentValue: {
        type: Number,
        required: true,
        default: 0
    },
    actuatorTimeStamp: {
        type: String,
        required: true,
        default: new Date()
    }
}, { timestamps: true })
ActuatorSchema.index({ actuatorName: 1, deviceIdentification: 1 }, { unique: true })
export const ActuatorModel = mongoose.model('ActuatorModel', ActuatorSchema)
