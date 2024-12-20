import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { usersRouter } from "./routes/users";
import { ticketsRouter } from "./routes/tickets";
import { rootRouter } from "./routes/root";
import { loginRouter } from "./routes/login";
import { logMethod } from "./middleware";

dotenv.config({path: "../.env"});
const app = express();

app.use(cors({origin: ["http://localhost:5173"]}));
app.use(express.json());
app.use(express.static("public"));
app.use(logMethod())
app.use(cookieParser());


// Routes
const routes = [
  { path: "/", router: rootRouter },
  { path: "/users", router: usersRouter },
  { path: "/tickets", router: ticketsRouter },
  { path: "/login", router: loginRouter },
];
routes.forEach((route) => app.use(route.path, route.router));

// Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
db ? console.log("Firebase OK") : console.log("Firebase ERROR");

app.listen(3000, () => {
  console.log("Server running on port 3000");
})