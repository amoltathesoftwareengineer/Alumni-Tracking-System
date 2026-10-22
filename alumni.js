
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { search = "" } = req.query;

    const filter = {
      _id: { $ne: req.user.id },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
        { degree: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    };

    const alumni = await User.find(filter)
      .select("-password")
      .sort({ name: 1 })
      .limit(100);

    res.json(alumni);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alumni"
    });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
});

router.put("/me", auth, async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "graduationYear",
      "degree",
      "company",
      "jobTitle",
      "location",
      "bio"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile"
    });
  }
});

module.exports = router;
