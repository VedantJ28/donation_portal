import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Admin = mongoose.model("Admin", AdminSchema);

Admin.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10);
    }
    next();
});

Admin.methods.isvalidPassword = async function(password){
    return bcrypt.compare(password, this.password);
}

export { Admin };