import express from 'express'
import { login, registerAdmin, registerStylist, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post("/register-user", registerUser)
router.post("/register-stylist", registerStylist)

// Login
router.post("/login", login)

// Register as Admin
router.post("/register-admin", registerAdmin)



export default router;