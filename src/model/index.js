const { Schema, model } = require("mongoose");

const citySchema = new Schema({
    name: { type: String, default: "" },
    position: { type: Number, default: 0 },
    percent: { type: String, default: "" },
    count: { type: Number, default: 0 },
    region_id: { type: Number, default: 0 },
    city_slug: { type: String, default: "" },
})



const cityModel = model("cities", citySchema)
module.exports = { cityModel }

