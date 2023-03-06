import mongoose, { Schema } from 'mongoose'

const DeviceSchema = new Schema({
    accountId: {
        type: String,
        index: true,
        required: true
    },
    deviceTenantId: {
        type: String,
        required: true,
        index: true
    },
    deviceIdentification: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    deviceName: {
        type: String,
        index: true,
        required: true
    },
    deviceType: {
        type: String,
        index: true,
        required: true
    }
}, { timestamps: true })

export const DeviceModel = mongoose.model('DeviceModel', DeviceSchema)
