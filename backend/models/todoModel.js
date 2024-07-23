// models/todoModel.js

const mongoose = require("mongoose");

const todoModelSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "deleted"],
    default: "ongoing",
  },
});

// .toJSON method is called everytime res.json is called
// convert _id to id and remove _id and __v from the object
todoModelSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Todo = mongoose.model("Todo", todoModelSchema);

module.exports = Todo;