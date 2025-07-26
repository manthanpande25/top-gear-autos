const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') }); // ✅ loads from backend/.env no matter where you run from


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const carRoutes = require('./routes/carRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Debug log to check if .env is loaded correctly
console.log("Connecting to Mongo URI:", process.env.MONGO_URI);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/cars', carRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


app.get('/', (req, res) => {
  res.send('Top Gear Autos API is running 🚗');
});

