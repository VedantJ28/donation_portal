import mongoose, {Schema} from "mongoose";

const donationSchema = new Schema({
    donor:{
        type: Schema.Types.ObjectId,
        ref:'Donar',
        required: true,
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: 'NGO',
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum:['Cloth', 'Book', 'Toy', 'School Supplies', 'Other'],
        required: true
    },
    quantity:{
        type: String,
    },
    isReceived:{
        type:Boolean,
        default: false
    },
    recievedAt:{
        type: Date,
    },
    image:{
        type: String,
    }
}, {
    timestamps: true,
});

export const Donation = new mongoose.model("Donation", donationSchema);