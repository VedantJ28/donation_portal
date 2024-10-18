import mongoose, { Schema } from 'mongoose';

const ngoSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organizationName: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    donationsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }],
    profile:{
        type: String,
        required: true
    },
    cover:{
        type: String,
    }
}, {
    timestamps: true
});

export const NGO = new mongoose.model("NGO",ngoSchema);