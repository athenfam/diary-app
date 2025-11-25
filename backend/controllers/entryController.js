export async function getAllEntries(req, res) {
    try {
        const entry = await Entry.find();
        res.status(200).json(entry);
    } catch (error) {
        console.error("Error getting all entries ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function createEntry(req, res) {
    try {
            const { title, content } = req.body;
            const entry = new Entry({ title, content });
            const savedEntry = await entry.save();
            res.status(201).json(savedEntry);
        } catch (error) {
            console.error("Error creating entry ", error);
            res.status(500).json({ message: "Server Error" });
        }
}

export async function updateEntry(req, res) {
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
}
export async function deleteEntry(req, res) {
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
}