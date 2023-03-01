import express from "express";
import UserModel from "./model.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
