const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const consumesSchema = new Schema({
  date: {
    type: String,
    required: [true, "Date required"],
  },
  products: {
    type: Array,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Consumes = mongoose.model("consumes", consumesSchema);

module.exports = Consumes;
