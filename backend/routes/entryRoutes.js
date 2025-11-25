import express from "express";
import {getAllEntries, createEntry, updateEntry, deleteEntry} from "../controllers/entryController.js";


const router = express.Router();

router.get("/getAllEntries", getAllEntries);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

//router.get("/:id", getEntryById);
//router.delete("/", deleteAllEntries);

export default router;