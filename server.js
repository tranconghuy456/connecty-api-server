import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import * as router from "./routes/root.js";
import * as ENV from "./configs/root.js";

// init server
const app = express();

// configs
// built-in middleware for JSON
app.use(express.json());

// CORS
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

// bandwidth
app.use(morgan("tiny"));
// hide server info
app.disable("x-powered-by");

// api routes
// default
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Home request /" });
});

// authentication
app.use("/api/v1/users/", router.userRouter);

app.listen(ENV.SERVER.PORT, (error) => {
  let log = {
    Server: {
      Port: ENV.SERVER.PORT,
      State: !error ? "Conencted" : "ERROR.",
    },
    // Database: {
    //   Port: db.connection.port,
    //   State: db.connection._readyState === 1 ? "Connected." : "ERROR.",
    // },
  };
  console.table(log);
});