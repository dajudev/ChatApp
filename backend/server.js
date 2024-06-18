import  express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//FILES
import connectToMongoDB from './db/connectToMongoDB.js';

//ROUTES
import authRoutes from './Routes/auth.routes.js';
import messageRoutes from './Routes/message.routes.js';
import userRoutes from './Routes/user.routes.js';


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); //TO PARSE THE INCOMING REQUESTS WITH JSON
app.use(cookieParser()); //TO PARSE THE INCOMING COOKIES FROM REQ.COOKIES


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, ()=> {
    connectToMongoDB()
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});