/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { TComment, TPost, TPostsQuery } from "./post.interface";
import { Post} from "./post.model";

const createPostIntoDB = async (payload : TPost) => {
    const result = await Post.create(payload);
    return result;
}


// const getMyPostsFromDB = async (userEmail : string) => {
 
  
//     // const posts = await Post.find(filter).sort(sortOption))
//     // return posts;
// }


const getAllPostsFromDB = async (query : TPostsQuery) => {
        const filter : Record<string ,unknown> = { isDeleted : false};
  
        //  {
                // location : 'tangail'
                // userEmail : 'sedun'
                // costRange : '10-35'
                // sortByCost : -1
                // status : 'unavailable'
        //  }
  
    // Add search value to filter if provided
    if (query.location) {
      filter.$or = [
        { location: { $regex: query.location, $options: 'i' } },
      ];
    }
  
    // Add userEmail to filter if provided
    if (query.userEmail) {
      filter["authorInfo.email"] = query.userEmail;
    }
  
    // Add status to filter if provided
    if (query.status) {
      filter.status = query.status;
    }
  
    // Add pricePerHour to filter if provided
    if (query.costRange) {
      const [startingCost, endingCost] = query.costRange.split('-').map(Number);
      filter.pricePerHour = { $gte: startingCost, $lte: endingCost };
    //   console.log(filter)
    }
  
    // Set sort option based on sortByPrice if provided
    const sortOption : {
       pricePerHour?: SortOrder;
      } = {};
  
    if (query.sortByCost) {
      sortOption.pricePerHour = Number(query.sortByCost) as SortOrder;
    }
 
  
    const posts = await Post.find(filter).sort({ createdAt : 'descending', ...sortOption})
    return posts;
}


const getSinglePostFromDB = async (id: string) => {
    const result = await Post.findById(id);
    return result;
}

const updatePostIntoDB = async (id: string , payload: Partial<TPost>) => {
    const result = await Post.findByIdAndUpdate(id, payload ,{new: true });
    return result;
}


const deletePostFromDB = async ( id: string) => {
    const result = await Post.findByIdAndUpdate(id, { isDeleted: true } ,{new: true });
    return result;
}


export const postServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    getSinglePostFromDB,    updatePostIntoDB, 
}