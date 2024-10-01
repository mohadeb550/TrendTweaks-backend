
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";



const addCommentToDB = async (payload : TComment ) => {
    const result = await Comment.create(payload);
    return result;
}


const getCommentsFromDB = async (postId: string) => {
  
  const result = await Comment.find({ postId}).sort({ createdAt : 'descending'});
  return result;
}

const deleteCommentFromDB = async (commentId: string) => {
  const result = await Comment.findByIdAndDelete(commentId);
  return result;
}

const updateCommentIntoDB = async (commentId: string , payload: Partial<TComment>) => {
  const result = await Comment.findByIdAndUpdate(commentId, payload ,{new: true });
  return result;
}




// const getStatisticsFromDB = async () => {
//     // Count total bookings
//     const totalBookings = await Booking.countDocuments();

//      // Count available cars
//      const availableCars = await Car.countDocuments({isDeleted: false, status: 'available' });

//      // Calculate total revenue from bookings
//     const bookings = await Booking.find({}).select('totalCost');
//     const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalCost || 0), 0);

//     const statistics = {
//         totalBookings,
//         availableCars,
//         totalRevenue
//     }

//   return statistics;
// }



export const commentServices = {
    addCommentToDB, getCommentsFromDB, deleteCommentFromDB, updateCommentIntoDB
}