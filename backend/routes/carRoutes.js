const express = require('express');
const router = express.Router();
const { getAllCars, addCar, deleteCar } = require('../controllers/carController');
const auth = require('../middleware/auth');
const Car = require('../models/car'); // ✅ Correct case

// ✅ DELETE BY NAME - PLACE BEFORE '/:id'
router.delete('/delete-by-name/:name', auth, async (req, res) => {
  const name = req.params.name;

  try {
    const deleted = await Car.findOneAndDelete({ name: new RegExp(`^${name}$`, 'i') });

    if (deleted) {
      res.json({ success: true, message: `Car "${name}" deleted.` });
    } else {
      res.json({ success: false, message: `No car found with name "${name}".` });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ✅ REST ROUTES
router.post('/', auth, addCar);
router.delete('/:id', auth, deleteCar);
router.get('/', getAllCars);

module.exports = router;
