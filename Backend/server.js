const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/extract-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const rawText = data.text;

    // Return first 5 non-empty lines
    const questions = rawText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 5);

    res.json({ questions });
  } catch (err) {
    console.error('Error parsing PDF:', err);
    res.status(500).json({ error: 'Failed to parse PDF.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
