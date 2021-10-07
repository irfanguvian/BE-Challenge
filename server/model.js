const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  positif: {
    type: Number,
  },
  recovered: {
    type: Number,
  },
  death: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const data = mongoose.model("Data Covid", schema);

module.exports = data;
