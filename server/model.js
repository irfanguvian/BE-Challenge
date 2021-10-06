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
});

const data = mongoose.model("Data Covid", schema);

module.exports = data;
