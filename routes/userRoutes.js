import express from "express";
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, 
    login, logout, register, removeFromPlaylist, resetPassword, updateProfile, 
    updateUserRole, 
    updateprofilepicture } from "../controllers/userController.js";
import {authorizeAdmin, isAuthenticated} from '../middlewares/auth.js'
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

// to register a new User
router.route('/register').post(singleUpload, register);

//login 
router.route('/login').post(login); 

// logout
router.route('/logout').get(logout);

//getmyprofile (this is acceable when user already login)
router.route('/me').get( isAuthenticated , getMyProfile);


// delete my profile (dele user itself)
router.route('/me').delete(isAuthenticated, deleteMyProfile );

//change password
router.route('/changepassword').put( isAuthenticated , changePassword);

//updateprofile
router.route('/updateprofile').put( isAuthenticated , updateProfile);

// update profile picture
router.route('/updateprofilepicture').put( singleUpload, isAuthenticated , updateprofilepicture);

//forgetpassword
router.route('/forgetpassword').post(forgetPassword);

//resetpassword
router.route('/resetpassword/:token').put(resetPassword);

//add to playlist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);

//remove from playlist
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

//--------------------------------------------------------------------------------

// admin Acoout Routes

// get all users by admin account(so for this we need to update user role manually by database)
router.route('/admin/users').get(isAuthenticated, authorizeAdmin, getAllUsers);

// update User Role (automatic by api) > //Delete User >
router.route('/admin/user/:id').put(isAuthenticated, authorizeAdmin, updateUserRole)
.delete(isAuthenticated, authorizeAdmin, deleteUser)









export default router;
