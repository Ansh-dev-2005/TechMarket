// create routes for contact

import express from "express";
import { createContact, getContacts } from "../controllers/Contact.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/create",  createContact);
router.get("/contacts", verifyToken, getContacts);

export default router;