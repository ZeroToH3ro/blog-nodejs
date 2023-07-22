const mongoose = require('mongoose');
//Step 1: Create a new schema
//Step 2: Create object with variable
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        require: true,
        type: String
    },
    body: {
        require: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});
module.exports = mongoose.model(
    'Post',
    PostSchema
);
