import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/register' , userController.register);
router.post('/login' , userController.login);
router.get("/allusers/:id", userController.getAllUsers);
router.post("/setavatar/:id", userController.setAvatar);

export default router;

