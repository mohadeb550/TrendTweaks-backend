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
    followers : {
        type : [String],
    },
    following: {
        type : [String]
    },
    memberShip: {
        type: Schema.Types.Mixed, // Allows either 'null' or an object
        default: null
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