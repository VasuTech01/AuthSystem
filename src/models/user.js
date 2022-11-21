const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim:true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is no Valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required:true
      }  
    }]

}, { timestamps: true });
userSchema.statics.findByCredentials = async ( email, password ) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to Login");
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
        throw new Error("Password Not matching");
    }
    return user;
}
userSchema.methods.getAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    try {
        await user.save();
        return token;
    } catch (e) {
        throw new Error("Error Getting Tokken" + e.message);
    }

}

const User = mongoose.model("User", userSchema);

module.exports = User;