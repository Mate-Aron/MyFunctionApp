const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // JSON kérések kezelése

// Parancs fogadása
app.post('/api/command', (req, res) => {
  const { command } = req.body;
  console.log(`Received command: ${command}`);
  res.status(200).send({ message: 'Command received!' });
});

// Azure Web App indítása
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});