
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    graduationYear: {
      type: Number,
      default: null
    },
    degree: {
      type: String,
      default: ""
    },
    company: {
      type: String,
      default: ""
    },
    jobTitle: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["alumni", "admin"],
      default: "alumni"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
