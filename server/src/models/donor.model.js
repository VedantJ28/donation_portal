import mongoose, { Schema } from 'mongoose';

const donarSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true
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
    donationsMade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
    }],
    profile: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Donor = new mongoose.model("Donor", donarSchema);