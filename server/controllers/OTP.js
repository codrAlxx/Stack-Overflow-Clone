import users from "../models/auth.js";
import otp from "../models/otp.js";
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const MAIL_SETTINGS = {
    host: 'smtp-relay.brevo.com',
    port: '587',
    auth: {
        user: 'alok08jha@gmail.com',
        pass: process.env.SIB_API_KEY
    },
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'lera.anderson79@ethereal.email',
    //     pass: 'gSjqQk32dxpHwu9q4j'
    // }
};

const   transporter =  nodemailer.createTransport(MAIL_SETTINGS)


export const sendOtp = async (req,res) => {
    const { userId, email } = req.body;
    // console.log(req.body);
    // console.log(userId)
    // console.log(email)
    try{
        const existinguser = await users.findById(userId);
        if(!existinguser){
            return res.status(404).json({message: "User does not exist."})
        } else {
            const otpCode = Math.floor(( Math.random() * 100000 ) + 1);
            const otpData = new otp({
                email: email,
                code: otpCode,
                expireIn: new Date().getTime() + 300 * 1000
            })
            const otpResponse = await otpData.save();

            let info = await transporter.sendMail({
                from: MAIL_SETTINGS.auth.user,
                to: email, 
                subject: 'OTP Verification - StackOverflow Clone',
                html: `
                <div
                  class="container"
                  style="max-width: 90%; margin: auto; padding-top: 20px"
                >
                  <h2>Welcome to My StackOverflow Clone.</h2>
                  <h4>You can enter the following OTP to verify and use the AI Chatbot system</h4>
                  <p style="margin-bottom: 30px;">Please enter the OTP before 5 minutes of this email or it will expire.</p>
                  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otpCode}</h1>
                </div>
                `,
            });


            res.status(200).json({ success: true, otpResponse, info });
        }
    } catch(err){
        res.status(500).json("Something went wrong...");
        console.log(err);
    }
}

export const verifyOtp = async (req,res) => {
    console.log(req.body)
    const { email, code } = req.body;
    const userId = req.userId;
    // console.log(userId)
    console.log(req.body);
    const user = await users.findById(userId);

    try{
        const existinguser = await otp.find({email: email, code: code});
        //we verify the otp
        console.log(existinguser);
        if(existinguser.length === 0){
            console.log("Wrong OTP")
            return res.status(200).json({message: "code not found", verified: false})
        } else {
            let currentTime = new Date().getTime();
            let diff = existinguser.expireIn - currentTime;
            if(diff < 0){
                console.log("Expired")
                res.status(200).json({message: "otp has expired", verified: false});
            } else {
                console.log(user)
                user.verified = true;
                await user.save();
                return res.status(201).json({
                  success: true,
                  user: user,
                });
                // res.status(200).json({verified: true});
            }
        }
    } catch(err){
        res.status(500).json('Verification of OTP went wrong');
        console.log(err);
    }
}