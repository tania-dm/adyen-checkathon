const mongoose = require('mongoose');
const { Schema } = mongoose;

const payment = new Schema ({
  pspReference: {type: String, required: true},
  cardHolderName: {type: String, required: true}
});

module.exports = mongoose.model('Payment', payment)
