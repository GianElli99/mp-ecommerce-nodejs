var express = require('express');
var cors = require('cors');
var exphbs = require('express-handlebars');
const path = require('path');
const mercadopago = require('mercadopago');

var app = express();

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
  res.render('detail', req.query);
});

app.post('/preference', (req, res) => {
  let preference = {
    items: [
      {
        id: '1234',
        title: 'Botas', //req
        picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif', //req
        unit_price: 450, //req
        quantity: 1,
        description: 'Dispositivo móvil de Tienda e-commerce',
      },
    ],
    back_urls: {
      success: 'http://localhost:8080/success',
      failure: 'http://localhost:8080/feedback',
      pending: 'http://localhost:8080/feedback',
    },
    auto_return: 'approved',
    external_reference: 'gianelli99@hotmail.com',
    payer: {
      name: 'Lalo',
      surname: 'Landa',
      email: 'test_user_63274575@testuser.com',
      phone: {
        area_code: '11',
        number: '22223333',
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
    notification_url: 'https://qweqweqwe/webhook',
  };
});

module.exports = {
  app,
};
