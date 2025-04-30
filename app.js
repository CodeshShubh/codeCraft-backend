import express from "express";
import dotenv from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors"; //for horeku diplyoment

 
 

dotenv.config()

const app = express();

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(cookieParser());

// for horeku diplyment for tranfering cookies(to request this server to other website)
app.use(
    cors({
      origin: process.env.FRONTEND_URL, // that means this frontend url used these apis
      credentials: true,                // for use used cookies
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );


// Importing & Using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";


app.use("/course",course);
app.use("/user",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);



export default app;

// default  route for diploying horeku
app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware)