var express = require('express');
var cors = require('cors');
var exphbs = require('express-handlebars');
const path = require('path');
const mercadopago = require('mercadopago');
const query = require('express/lib/middleware/query');

const { URL, ACCESS_TOKEN, INTEGRATOR_ID } = process.env;

var app = express();

mercadopago.configure({
  access_token: ACCESS_TOKEN,
  integrator_id: INTEGRATOR_ID,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/assets', express.static(path.join(__dirname, '../assets')));
console.log(path.join(__dirname, '../assets'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/detail', (req, res) => {
  console.log(req.query);
  res.render('detail', req.query);
});

app.post('/preference', (req, res) => {
  const { title, unit_price, picture_url } = req.body;
  var pictureSanitized = picture_url.substring(1);
  let preference = {
    items: [
      {
        id: '1234',
        title: title,
        picture_url: `${URL}/${pictureSanitized}`,
        unit_price: Number(unit_price),
        quantity: 1,
        description: 'Dispositivo móvil de Tienda e-commerce',
      },
    ],
    back_urls: {
      success: `${URL}/feedback`,
      failure: `${URL}/feedback`,
      pending: `${URL}/feedback`,
    },
    auto_return: 'approved',
    external_reference: 'gianelli99@hotmail.com',
    payer: {
      name: 'Lalo',
      surname: 'Landa',
      email: 'test_user_63274575@testuser.com',
      phone: {
        area_code: '11',
        number: 22223333,
      },
      address: {
        street_name: 'Falsa',
        street_number: 123,
        zip_code: '1111',
      },
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'amex',
        },
      ],
      excluded_payment_types: [
        {
          id: 'atm',
        },
      ],
      installments: 6,
    },
    notification_url: `https://webhook.site/d501ba4d-9e61-4d7a-89ad-6b43e3a12b99?source_news=webhook`,
  };
  mercadopago.preferences.create(preference).then((response) => {
    res.redirect(response.body.init_point);
  });
});

app.get('/feedback', (req, res) => {
  res.render('feedback', req.query);
});

app.post('/notifications', (req, res) => {
  res.sendStatus(200);
});

module.exports = {
  app,
};
