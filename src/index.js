require('dotenv/config');
const { app } = require('./app');
const mercadopago = require('mercadopago');

const { PORT, ACCESS_TOKEN, INTEGRATOR_ID } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
  integrator_id: INTEGRATOR_ID,
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
