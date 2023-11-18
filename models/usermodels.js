const mongoose = require("mongoose");

userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name"],
      },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please emter a password"],
    unique: true,
    minlength : 8,
    select: false,
  },
  passwordConfirm : {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same'
    }
  },
  role: {
    type: String,
    enum: ["user","admin","lead_guide","guide"],
    default: "user"
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpired: {
    type: Date,
  }
});

const User = mongoose.model("user",userschema);

module.exports = User;