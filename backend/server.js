import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware to parse JSON bodies: req.body
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  
});

// add _ if not used 
app.get("/", (_, res) => {
    res.send("Hello World!");
});


// Routes
app.use("/api/entries", entryRoutes);
// app.use("/api/pictures", userRoutes);

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});