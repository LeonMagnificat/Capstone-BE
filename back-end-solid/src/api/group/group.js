import express from "express";
import GroupModel from "./model.js";
import shortid from "shortid";
import UserModel from "../user/model.js";

const groupRouter = express.Router();

groupRouter.post("/newGroup", async (req, res, next) => {
  const newGroup = new GroupModel(req.body);
  //   const hostURL = req.headers.host;
  //   const invitationLink = `${hostURL}/${newGroup._id}/join/${shortid.generate()}`;
  //   newGroup.invitation = invitationLink;

  await newGroup.save();

  res.status(200).send(newGroup);

  try {
  } catch (error) {
    next(error);
  }
});

groupRouter.post("/inviteGroup/:groupId", async (req, res, next) => {
  const groupId = req.params.groupId;
  const { email } = req.body;
  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      // send registration email and join group invitation
    } else {
      // sign in and join group
    }
    const hostURL = req.headers.host;

    const groupLink = `${hostURL}/group/${groupId}/join/${userId}`;
    res.status(200).json(groupLink);
  } catch (error) {
    next(error);
  }
});

groupRouter.post("/:groupId/join/:userId", async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "User is already in group" });
    }

    group.members.push(userId);
    await group.save();
    res.status(200).send(group);
  } catch (error) {
    next(error);
  }
});

export default groupRouter;
