import express from 'express';

import { login, signup } from '../controllers/auth.js'
import { getAllUsers, updateProfile } from '../controllers/users.js'
import auth from '../middleware/auth.js'



const router = express.Router();

router.get('/v1', (req, res) => {
	res.send('hello world from users')
})



router.post('/signup', signup)
router.post('/login', login)



router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router