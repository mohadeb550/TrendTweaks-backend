import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
    title : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    rating : {
        type : String,
    },
    images : {
        type : [String],
        required : true,
    },
    comments : {
        type : [String],
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true })

export const Post = model<TPost> ('Post', postSchema);