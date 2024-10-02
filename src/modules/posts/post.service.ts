/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { TPost, TPostsQuery } from "./post.interface";
import { Post} from "./post.model";

const createPostIntoDB = async (payload : TPost) => {
    const result = await Post.create(payload);
    return result;
}



const voteToPost = async (payload : { 
  postId: string, 
  userId: string, 
  voteType: string
}) => {

  const { postId, userId, voteType } = payload;
  let post = await Post.findById(postId);


  // Check if the user has already voted on this post
  const existingVote = post?.voters?.find(voter => voter.userId === userId);

  if (existingVote) {
    
    // If the user has already voted and tries to change their vote
    if (existingVote.voteType !== voteType) {
      if (voteType === 'upvote') {
        post.votes += 2; // Change from downvote (-1) to upvote (+1), so +2
      } else if (voteType === 'downvote') {
        post.votes -= 2; // Change from upvote (+1) to downvote (-1), so -2
      }

      // Update the vote type in the voters array
      existingVote.voteType = voteType;
    }else{
     const restVoters =  post?.voters?.filter(voter => voter.userId !== userId)
     post?.voters = restVoters;

     if(voteType === 'downvote')post?.votes += 1;
     if(voteType === 'upvote')post?.votes -= 1;
    }
  } else {
    // If the user has not voted, add a new vote
    post.voters.push({ userId, voteType });

    if (voteType === 'upvote') {
      post.votes += 1; // Increment votes by 1 for upvote
    } else if (voteType === 'downvote') {
      post.votes -= 1; // Decrease votes by 1 for downvote
    }
  }

  // Save the post with the updated vote count
 const res = await post?.save();
  return res


    // const result = await Post.create(payload);
    // return result;
}



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
    getSinglePostFromDB,
    updatePostIntoDB, voteToPost
}