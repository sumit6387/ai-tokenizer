import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function tokenizer(text) {
 const splittedText =  text
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);
    let array = [];
    for (let index = 0; index < splittedText.length; index++) {
      const element = splittedText[index];
      let bitString = '';
      for (let i = 0; i < element.length; i++) {
        // Get the ASCII/Unicode value of the character
        const charCode = element.charCodeAt(i);
        // Convert the character code to its binary representation
        // toString(2) converts a number to its binary string representation
        // padStart(8, '0') ensures each binary representation is 8 bits long by adding leading zeros if necessary
        const binaryChar = charCode.toString(6);
        bitString += binaryChar;
      }
      array.push(bitString);
      
    }
    
    return array;
}

app.post("/tokenize", (req, res) => {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: "No input provided" });

  const tokens = tokenizer(input);
  res.json({ tokens });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
