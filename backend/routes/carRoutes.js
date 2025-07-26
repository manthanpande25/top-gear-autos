const express = require('express');
const router = express.Router();
const {
  getAllCars, addCar, deleteCar
} = require('../controllers/carController');
const auth = require('../middleware/auth');



const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, addCar);
router.delete('/:id', authMiddleware, deleteCar);


router.get('/', getAllCars);
router.post('/', auth, addCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;
