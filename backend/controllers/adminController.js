const Admin = require('../models/Admin'); // ✅ match case
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: admin._id, username: admin.username }, "topgear_secret", {
      expiresIn: "2h"
    });

    res.json({
      success: true,
      message: "Login successful",
      token // ✅ send token to frontend
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
