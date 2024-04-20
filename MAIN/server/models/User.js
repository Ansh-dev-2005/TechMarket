

import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
// import { v4 as uuid } from "uuid";

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userType: {
      type: String,
      enum: ["admin", "readonly", "student"],
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: false
    },
    salt: {
      type: String,
      required: true,
    },

    encpy_password: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);
const User = model("User", userSchema);

export default User;
