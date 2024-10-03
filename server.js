const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the CSV file
app.get("/Table_Input.csv", (req, res) => {
  const filePath = path.join(__dirname, "Table_Input.csv");
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("CSV file not found:", err);
      res.status(404).send("CSV file not found");
    } else {
      res.sendFile(filePath);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
