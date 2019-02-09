'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Payment = require('./models/payment');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

// database
mongoose.connect('mongodb://localhost:27017/checkathon', { useNewUrlParser: true });

//config
app.use(express.static('public'));
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
const makePayment = async(payload) => {
  try {
    const temporaryPayload = {
      amount: {
        value: payload.value,
        currency: payload.currency
      },
      paymentMethod: {
        type: 'scheme',
        number: payload.cardNumber,
        expiryMonth: payload.expiryMonth,
        expiryYear: payload.expiryYear,
        holderName: payload.holderName,
        cvc: payload.cvc
      }
    };

    const request = {
      amount: {
        currency: 'EUR',
        value: 5000
      },
      reference: 'Your order number',
      merchantAccount: 'TeamFour',
      ...temporaryPayload
    };

    return await axios({
      method: 'post',
      url: 'https://checkout-test.adyen.com/v41/payments',
      headers: {
        'Content-Type': 'application/json',
        'x-API-key': process.env.API_KEY
      },
      data: request})
    } catch (error) {
      console.log(error);
    }
}

app.post('/payments', function(req, res) {
  makePayment(req.body)
    .then(result => {
      const newPayment = {
        pspReference: result.data.pspReference,
        cardHolderName: result.data.additionalData.cardHolderName
      };
      Payment.create(newPayment)
        .then(payment => {
          console.log('saved')
          res.send({ message: 'Payment authorised' });
        })
        .catch(error => {
          res.status(500).send({ error: 'upsss' });
          next(error)
        })

      // Payment.create(newPayment)
      //   .then(payment => {
      //     console.log('saved')
      //     // do stuff
      //     res.end()
      //   })
      //   .catch(error => next(error))
    })

});


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})
