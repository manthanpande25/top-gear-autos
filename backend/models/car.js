// backend/models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  price: String,
  year: Number,
  km: String,
  fuel: String,
  transmission: String,
  category: String,
  image: String,
});

module.exports = mongoose.model('Car', carSchema);
