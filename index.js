const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

// Helmet CSP beállítás
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "https://car-driving-function-app.azurewebsites.net/api/command"],
      },
    },
  })
);

// CORS engedélyezése
app.use(cors());

// JSON kérések feldolgozása
app.use(express.json());

app.post('/api/command', (req, res) => {
  const { command } = req.body;
  console.log(`Received command: ${command}`);
  res.status(200).send('Command received!');
});

// Hibakezelő
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
