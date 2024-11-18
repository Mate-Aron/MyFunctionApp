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
        scriptSrc: ["'self'", "'unsafe-inline'"], // Ha mindenképp kell inline script
        connectSrc: ["'self'", "https://car-driving-function-app.azurewebsites.net"],
      },
    },
  })
);

// CORS pontos engedélyezése
app.use(cors({
  origin: ['https://car-driving-function-app.azurewebsites.net'], // Engedélyezett domain(ek)
}));

// JSON kérések feldolgozása
app.use(express.json());

// API endpoint
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
