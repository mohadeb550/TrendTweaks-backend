import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema <TUser>({
    name: {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        enum : ['user','admin']
    },
    password : {
        type : String,
    },
    image : {
        type : String,
        required : true,
    },
    isBlocked : {
        type : Boolean,
        default : false,
    }
}, { timestamps : true })

export const User = model <TUser> ('User', userSchema);