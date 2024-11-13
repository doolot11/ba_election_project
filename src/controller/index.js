const { cityModel } = require("../model")

class Election {
    async getCities(req, res) {
        try {
            const cities = await cityModel.find()
            await res.json(cities)
        } catch (error) {
            return res.status(500).json({ message: "Error cities" })
        }
    }
}

module.exports = new Election