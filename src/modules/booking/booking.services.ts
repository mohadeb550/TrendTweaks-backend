
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../posts/post.model";
import { User } from "../user/user.model";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { TBooking } from "./booking.interface";


const createBookingIntoDB = async (userEmail: string, payload : TBooking ) => {
    // get userData by email 
    const userData = await User.findOne({ email: userEmail}, { createdAt : 0, updatedAt : 0, password: 0, __v : 0})
   
       // update the car status available to unavailable 
    const carData =  await Car.findByIdAndUpdate(payload.car._id, { status: 'unavailable'}, { new: true })

    if(!userData){
        throw new AppError(httpStatus.NOT_FOUND, 'user is not exist')
    }

    if(!carData){
        throw new AppError(httpStatus.NOT_FOUND, 'car is not exist')
    }

    if(carData.isDeleted === true ){
        throw new AppError(httpStatus.NOT_FOUND, 'car is not found')
    }


    const bookingData: Record<string, unknown> = {...payload}

    const result = await Booking.create(bookingData);
    return result;
}


const getAllBookingsFromDB = async (query : Record<string, unknown>) => {
   const queryObj : Record<string, unknown> = {}

    if(query?.carId && query?.date){
        queryObj['car._id']  = new mongoose.Types.ObjectId(query.carId as string)
        queryObj.date = query.date;
    }
  
  const result = await Booking.find(queryObj);
  return result;
}

const getStatisticsFromDB = async () => {
    // Count total bookings
    const totalBookings = await Booking.countDocuments();

     // Count available cars
     const availableCars = await Car.countDocuments({isDeleted: false, status: 'available' });

     // Calculate total revenue from bookings
    const bookings = await Booking.find({}).select('totalCost');
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalCost || 0), 0);

    const statistics = {
        totalBookings,
        availableCars,
        totalRevenue
    }

  return statistics;
}


const getSingleBookingFromDB = async (bookingId : string) => {
  const result = await Booking.findById(bookingId);
  return result;
}

const updateBookingIntoDB = async (bookingId: string , payload: Partial<TBooking>) => {
    const result = await Booking.findByIdAndUpdate(bookingId, payload ,{new: true });
    return result;
}

const cancelBookingIntoDB = async (payload : {bookingId: string, carId : string}) => {

    const result = await Booking.findByIdAndUpdate(payload.bookingId, { status: 'cancelled'});

   if(result){
    await Car.findByIdAndUpdate(payload.carId, {status : 'available'});
    return result;
   } 
}


const getUserBookingsFromDB = async (userEmail: string) => {
  const result = await Booking.find({ 'user.email' : userEmail});
  return result;
}


export const bookingServices = {
    cancelBookingIntoDB, createBookingIntoDB, getAllBookingsFromDB,  getUserBookingsFromDB, getSingleBookingFromDB, updateBookingIntoDB, getStatisticsFromDB
}