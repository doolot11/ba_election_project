const { voutesModel, cityModel, partyModel } = require("../model")
const fs = require('fs');
const citiesJSON = require("../../cities.json")
const filePath = "../../cities.json"

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
            const result = []
            for (let i = 0; i < partiesWithCity.length; i++) {
                const slug = partiesWithCity[i].party_slug

                const getImage = await partyModel.findOne({ slug })
                const logo = getImage?.img || ""
                const oneParty = { ...partiesWithCity[i]._doc, logo };

                result.push(oneParty)
            }
            await res.json(result)

            // const topParties = await voutesModel.find({}).sort
        } catch (error) {
            console.log(error);

            return res.status(500).json(error)
        }
    }
    async uploadCities(req, res) {
        try {

            console.log(filePath);

            const jsonData = JSON.parse(fs.readFileSync(citiesJSON, 'utf-8'))
            // console.log(jsonData);

            const result = await cityModel.insertMany(jsonData);
            // console.log(result); 

            // console.log("Data successfully uploaded to the database.",citiesJSON);
            res.json("Success")
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    }
    async getCitiesWithParty(req, res) {
        try {
            const { party } = req.query
            const query = {}
            if (party) query.party_slug = party
            const cities = await voutesModel.find(query)
            res.json(cities)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new Election