const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const Car = require('./models/car');

// Sample cars (add more from your original list)
const cars = [
  {
    name: "Hyundai i20 Asta",
    price: "₹4.5 Lakh",
    year: 2017,
    km: "55,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    category: "Hatchback",
    image: "https://source.unsplash.com/featured/?car,hyundai"
  },
  {
    name: "Nissan Kicks",
    price: "₹5.2 Lakh",
    year: 2014,
    category: "MUV",
    image: "https://source.unsplash.com/featured/?car,kicks"
  },
  {
    name: "Kia Seltos",
    price: "₹15.5 Lakh",
    year: 2016,
    category: "Hatchback",
    image: "https://source.unsplash.com/featured/?car,seltos"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Car.deleteMany();
    await Car.insertMany(cars);
    console.log('Database seeded with cars 🚗');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
