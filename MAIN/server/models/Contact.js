// create a model for contact 

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const contactSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contact = model("Contact", contactSchema);

export default Contact;