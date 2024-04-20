// create controlelrs for contact

import Contact from "../models/Contact.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

const createContact = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const contact = new Contact(req.body);
    try {
      const savedContact = await contact.save();
      res.json({ contact: savedContact });
    } catch (err) {
      res.status(400).json({
        error: "NOT able to save contact in DB",
      });

    }

}
);

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.json(contacts);
    }
);

export { createContact, getContacts };