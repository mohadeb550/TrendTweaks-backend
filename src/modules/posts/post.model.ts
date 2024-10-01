import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

const commentSchema = new Schema({
    comment: { type: String, required: true },
    userInfo: {
        name : String,
        email : String,
        image : String
      },
  }, { timestamps: true });


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
    comments : [commentSchema],
    authorInfo : {
        type : {
            name : String,
            email : String,
            image : String,
            role : String,
            authorId : String,
            authorEmail : String,
        },
        required : true,
    },
    likesDislikes : {
        type : { likes: Number, dislikes : Number},
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true })

export const Post = model<TPost> ('Post', postSchema);