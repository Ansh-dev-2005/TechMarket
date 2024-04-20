
import express from 'express';

import { signIn, signup, loggout, userDetails, updateUser } from '../controllers/auth.js';

const router = express.Router();

router.post("/signin", signIn);
router.post("/update/:id", updateUser);
router.get("/user/:id", userDetails)
router.post("/signup", signup);
router.post("/logout", loggout);

export default router;
