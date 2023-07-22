const mongoose = require('mongoose');
//Step 1: Create a new schema
//Step 2: Create object with variable
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    }
});
module.exports = mongoose.model(
    'User',
    UserSchema
);
