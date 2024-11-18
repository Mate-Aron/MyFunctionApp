const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto'); // Hash generáláshoz szükséges

const app = express();
const port = process.env.PORT || 8080;

// Hash a használni kívánt inline scripthez
const scriptContent = "console.log('Hello World!');";
const hash = crypto.createHash('sha256').update(scriptContent).digest('base64');

// Helmet CSP beállítás hash-sel
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'sha256'+hash // Inline script engedélyezése hash-al
        ],
        connectSrc: ["'self'", "https://car-driving-function-app.azurewebsites.net"], // Engedélyezett endpoint
      },
    },
  })
);

// CORS pontos engedélyezése
app.use(
  cors({
    origin: '*', // Átmeneti megoldásként minden domain-t engedélyez
  })
);

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
