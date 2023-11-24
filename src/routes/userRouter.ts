import { Router } from "express";
import {
  registerUser,
  getMember,
  updateUser,
  deleteUser,
} from "../controllers/userController";


const jituClubRouter = Router();

jituClubRouter.post("/register", registerUser);
jituClubRouter.put("/update", updateUser);
jituClubRouter.get("/member/:id", getMember);
jituClubRouter.delete("/delete/:id", deleteUser);

export default jituClubRouter;
