import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: "string", required: true },
    // email: { type: "string", required: true },
    // password: { type: "string", required: true },
    // role: { type: "string", required: true },
    // blogs: [{ type: Schema.Types.ObjectId, ref: "blog" }],
  },

  { timestamps: true }
);

export default model("user", userSchema);
