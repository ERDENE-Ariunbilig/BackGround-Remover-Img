const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors()); // Allow frontend access

const upload = multer({ dest: "uploads/" });

app.post("/remove-bg", upload.single("image"), (req, res) => {
    const inputPath = req.file.path;
    const outputPath = `uploads/output-${Date.now()}.png`;

    exec(`rembg i ${inputPath} ${outputPath}`, (error) => {
        if (error) return res.status(500).send("Error processing image");

        res.download(outputPath, () => {
            fs.unlinkSync(inputPath); // Delete input file after processing
            fs.unlinkSync(outputPath); // Delete output file after download
        });
    });
});

app.listen(3000, () => console.log("✅ Background Remover API running on port 3000"));
