import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        enum: ['donor', 'ngo'], 
        default: 'donor' 
    }
},{
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);