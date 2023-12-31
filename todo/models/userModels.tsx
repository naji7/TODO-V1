import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    alias:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

let User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;