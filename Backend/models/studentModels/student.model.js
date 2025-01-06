const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  studentNumber:{
    type: String
  },
  universityRollNumber:{
    type: String
  },
  section:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  },
  personalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalInfo",
  },
  guardianInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GuardianInfo",
  },
  contactDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContactDetails",
  },
  educationalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EducationalDetails",
  },
  awardsAndAchievements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AwardsAndAchievements",
  },
});

module.exports = mongoose.model("Student", studentSchema);