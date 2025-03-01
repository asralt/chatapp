import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"; 
import messa from "./routes/auth.route.js"; 
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true  
}))

app.use("/api/auth",authRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});


app.listen(PORT, ()=>{
    console.log("server is running " + PORT); 
    connectDB()
});