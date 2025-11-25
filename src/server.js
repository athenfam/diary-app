import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Entry from "./models/Entry.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

//midlleware to parse JSON bodies: req.body
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// add _ if not used 

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.get("/api/login", (req, res) => {
    // verify login credentials here
    res.send("you are logged in");
});

app.post("/api/addEntry", async (req, res) => {
    try {
        const { title, content } = req.body;
        const entry = new Entry({ title, content });
        const savedEntry = await entry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error("Error creating entry ", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/api/getEntry", async (req, res) => {
    try {
        const entry = await Entry.find();
        res.status(200).json(entry);
    } catch (error) {
        console.error("Error getting entry ", error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.get("/api/getEntry/:id", async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        res.status(200).json(entry);
    } catch (error) {
        console.error("Error getting entry ", error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.put("/api/updateEntry/:id", async (req, res) => {
    try{
        const { title, content } = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error("Error updating entry ", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.delete("/api/deleteEntry/:id", async (req, res) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        return res.status(200).json("Deleted entry" + req.params.id);
    } catch (error) {
        console.error("Error deleting entry ", error);
        res.status(500).json({ message: "Server Error" });
    }
});