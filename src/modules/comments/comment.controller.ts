
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { commentServices } from "./comment.services";

const addComment = catchAsync (async (req, res) => {
  const result = await commentServices.addCommentToDB(req.body);
  
  sendResponse(res, {
   statusCode: httpStatus.OK,
   success: true,
   message: 'Comment added successfully',
   data: result,
 });
})


const getComments = catchAsync (async (req, res) => {
   const result = await commentServices.getCommentsFromDB(req.params?.postId);
   
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comments retrieved successfully',
    data: result,
  });
})



export const commentController = {
  addComment, getComments
}