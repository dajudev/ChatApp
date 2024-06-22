import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./Socket/socket.js";

//FILES
import connectToMongoDB from "./db/connectToMongoDB.js";

//ROUTES
import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
app.use(express.json()); //TO PARSE THE INCOMING REQUESTS WITH JSON
app.use(cookieParser()); //TO PARSE THE INCOMING COOKIES FROM REQ.COOKIES

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));


//THIS MAKES THAT THE FRONTEND AND BACKEND RUN INTO THE SAME SERVER
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
