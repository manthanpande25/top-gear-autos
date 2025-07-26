const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') }); // ✅ This fixes it

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const username = 'admin';
  const plainPassword = 'topgear123'; // ✅ You can change this

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('Admin already exists. Aborting.');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();
  console.log('✅ Admin created successfully!');
  process.exit();
};

createAdmin();
