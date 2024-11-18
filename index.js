const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// JSON kérések feldolgozása
app.use(express.json());

app.post('/', (req, res) => {
  const { command } = req.body;
  console.log(`Received command: ${command}`);
  res.status(200).send('Command received!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
