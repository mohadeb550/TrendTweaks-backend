
import express from 'express';
import auth from '../../middlewares/auth';
import { commentController } from './comment.controller';
const router = express.Router();


router.get('/:postId', auth('user','admin') , commentController.getComments )

// router.patch('/cancel', auth('admin'), bookingControllers.cancelBooking)

// router.put('/:bookingId', auth('admin', 'user'), bookingControllers.updateBooking)

// // get user's bookings
// router.get('/my-bookings', auth('user') , bookingControllers.getUserBookings )

// // get site statistics 
// router.get('/statistics', auth('admin') , bookingControllers.getStatistics )

// router.get('/:bookingId', auth('admin', 'user') , bookingControllers.getSingleBooking )


// add comments
router.post('/', auth('admin','user'), commentController.addComment )

export const CommentRoutes = router;