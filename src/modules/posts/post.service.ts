/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { TPost } from "./post.interface";
import { Post} from "./post.model";

const createPostIntoDB = async (payload : TPost) => {
    const result = await Post.create(payload);
    return result;
}

// query type asbe 
const getAllPostsFromDB = async (query) => {
        const filter : Record<string ,unknown> = { isDeleted : false};
  
        //  {
                // location : 'tangail'
                // carType : 'sedun'
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
  
    // Add carType to filter if provided
    if (query.carType) {
      filter.carType = query.carType;
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
  
    const cars = await Car.find(filter).sort(sortOption);
    return cars;
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
    getSinglePostFromDB, 
    updatePostIntoDB, 
    deletePostFromDB,
}