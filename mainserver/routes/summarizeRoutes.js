const express=require("express");
const { summarizeText } = require("../service/summarize");
const router=express.Router();

router.post("/summarize", async (req, res) => {
    const { text } = req.body; 

    if (!text) {
        console.log("No text provided");
        return res.status(400).json({ error: "No text provided" });
    }
 


    try {
        const summary = await summarizeText(text);
        console.log("Generated summary:", summary); 
        res.json({ summary });
    } catch (err) {
        console.error("Summarization error:", err);
        res.status(500).json({ error: "Failed to summarize" });
    }
});


module.exports = router;