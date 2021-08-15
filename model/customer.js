const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerFirstName: {
    type: String,
    required: true,
    unique: true,
  },
  customerLastName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
