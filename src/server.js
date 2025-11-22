import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/login", (req, res) => {
    // verify login credentials here
    res.send("you are logged in");
});

