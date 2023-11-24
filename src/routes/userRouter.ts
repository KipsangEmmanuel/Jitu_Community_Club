import { Router } from "express";
import {
  registerUser,
  getMember,
  updateUser,
  deleteUser,
} from "../controllers/userController";


const user_router = Router();

user_router.post("/register", registerUser);
user_router.put("/update", updateUser);
user_router.get("/member/:id", getMember);
user_router.delete("/delete/:id", deleteUser);

export default user_router;
