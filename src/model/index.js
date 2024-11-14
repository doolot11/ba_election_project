const { Schema, model } = require("mongoose");

const voutesSchema = new Schema({
    city_slug: { type: String, default: "" },
    name: { type: String, default: "" },
    region_id: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    percent: { type: String, default: "" },
    position: { type: Number, default: 0 },
    update_ts: { type: Number, default: 0 },
    logo: { type: String, default: "" }
    // voutes_slug: { type: String, default: "" },
    // path: { type: String, default: "" },
})

const citySchema = new Schema({
    name: { type: String, default: "" },
    slug: { type: String, default: "" },
    id: { type: String, default: "" },
    region_id: { type: String, default: "" },
    path: { type: String, default: "" }

})

const voutesModel = model("vote", voutesSchema)
const cityModel = model("city", citySchema)
module.exports = { voutesModel, cityModel }

