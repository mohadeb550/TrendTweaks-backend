
import express from 'express';


import { postControllers } from './post.controllers';
import auth from '../../middlewares/auth';
const router = express.Router();

// create 
router.post('/', auth('admin', 'user') , postControllers.createPost )

// return the car
// router.put('/return', validateRequest(carValidations.returnCarValidationSchema), auth('admin'), postControllers.returnPost )


// update  
router.put('/:id', auth('admin','user'), postControllers.updatePost )

// delete  
router.delete('/:id', auth('admin') , postControllers.deletePost)

// get 
router.get('/',  postControllers.getAllPosts)


router.get('/:id', postControllers.getSinglePost)


export const PostRoutes = router;