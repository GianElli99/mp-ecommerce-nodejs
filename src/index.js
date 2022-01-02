require('dotenv/config');
const { app } = require('./app');
const mercadopago = require('mercadopago');

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
