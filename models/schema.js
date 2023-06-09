const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    }, lastName: {
        type: String
    }, email: {
        type: String
    }, password: {
        type: String
    }, confirmPassword: {
        type: String
    }, contactNumber: {
        type: String
    },tokens: [{token: {type: String,required: true}}]
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;