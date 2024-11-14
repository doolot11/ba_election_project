const { voutesModel, cityModel } = require("../model")
const fs = require('fs');

class Election {
    async getTopParties(req, res) {
        try {
            const cities = await voutesModel.find({}).sort({ percent: -1 })
            await res.json(cities)
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: "Error cities" })
        }
    }
    async getPartiesWithCity(req, res) {
        try {
            const { city, region_id } = req.query
            console.log(city, region_id, "city");
            const query = {}
            if (city) query.city_slug = city;
            if (region_id) query.region_id = Number(region_id);

            const partiesWithCity = await voutesModel.find(query)
            await res.json(partiesWithCity)

            // const topParties = await voutesModel.find({}).sort
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
    async uploadCities(req, res) {
        try {
            const filePath = "../../cities.json"
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            await cityModel.insertMany(jsonData);
            console.log("Data successfully uploaded to the database.");
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    }
    async getCities(req, res) {
        try {
            const cities = await cityModel.find()
            res.json(cities)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new Election