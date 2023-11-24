import express, {
    json,
    NextFunction,
    Request,
    Response,
    urlencoded,
  } from "express";
  
import cors from "cors";
import user_router from "./routes/userRouter";

  
  const app = express();
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());

  app.use("/user", user_router)

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: err.message
    });
  });


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});