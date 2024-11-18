const { app, HttpRequest, HttpResponseInit } = require('@azure/functions');

// Tároló az utolsó parancs számára
let lastCommand = 'sss';

// POST metódus - JSON üzenet fogadása
app.http('commandHandler', {
  methods: ['POST', 'GET'],
  authLevel: 'function', // Autentikáció szintje
  handler: async (request, context) => {
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const { command } = body;

        if (!command) {
          return { status: 400, body: 'Missing "command" in request body.' };
        }

        lastCommand = command; // Tároljuk az utolsó parancsot
        context.log(`Received command: ${command}`);

        return { status: 200, body: 'Command received successfully!' };
      } catch (error) {
        context.log.error('Error processing POST request:', error);
        return { status: 500, body: 'Internal server error.' };
      }
    }

    if (request.method === 'GET') {
      context.log('Fetching the last command...');
      return { status: 200, body: { lastCommand } };
    }

    return { status: 405, body: 'Method not allowed.' };
  },
});