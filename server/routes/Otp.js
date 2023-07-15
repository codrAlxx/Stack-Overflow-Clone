import express from 'express';
import { sendOtp, verifyOtp } from './../controllers/OTP.js';
import auth from './../middleware/auth.js';

const router = express.Router();

router.post('/send-otp', auth, sendOtp);
router.post('/verify-otp', auth, verifyOtp);

export default router;