//Import mongoose package
const mongoose = require("mongoose");
//Import bcrypt package to hash and compare passwords
const bcrypt = require("bcrypt");

//Define User schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
    },
});

//hash user password before saving the user to MongoDB- This method is a Mongoose pre-save middleware. It runs before saving a user to MongoDB
userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

//custom method to compare login password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//Create User model from userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;
