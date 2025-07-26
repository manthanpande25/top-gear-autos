const Car = require('../models/car');

exports.getAllCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

exports.addCar = async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.json({ success: true, car: newCar });
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
