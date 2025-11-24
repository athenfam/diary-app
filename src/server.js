import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Entry from "./models/Entry.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//midlleware to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/login", (req, res) => {
    // verify login credentials here
    res.send("you are logged in");
});

app.post("/api/createEntry", async (req, res) => {
    try {
        const { title, content } = req.body;
        const entry = new Entry({ title, content });
        const savedEntry = await entry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error("Error creating entry ", error);
    }
});

app.get("/api/getEntry", async (req, res) => {
    try {
        const entry = await Entry.find();
        res.status(200).json(entry);
    } catch (error) {
        console.error("Error getting entry ", error);
    }
})

app.put("/api/updateEntry/:id", async (req, res) => {
    try
})

