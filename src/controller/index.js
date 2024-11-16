const { voutesModel, cityModel, partyModel, countOfVotesModel } = require("../model")
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
            const promise = partiesWithCity.map(async (par) => {
                const slug = par.party_slug;
                const getImage = await partyModel.findOne({ slug });
                const logo = getImage?.img || '';

                const oneParty = { ...par._doc, logo, percent: parseFloat(par.percent.slice(0, -1)) };
                return oneParty;
            })
            const resultArray = await Promise.all(promise);
            const resultSort = resultArray.sort((a, b) => b.percent - a.percent)
            console.log(resultSort);

            // const result = []
            // for (let i = 0; i < partiesWithCity.length; i++) {
            //     const slug = partiesWithCity[i].party_slug

            //     const getImage = await partyModel.findOne({ slug })
            //     const logo = getImage?.img 
            //     const oneParty = { ...partiesWithCity[i]._doc, getImage };

            //     result.push(oneParty)
            // }
            await res.json(resultSort)

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

            console.log(cities, "cmcm");


            const promise = cities.map(async (par) => {
                const city = { ...par._doc, percent: parseFloat(par.percent.slice(0, -1)) };
                return city;
            })
            const resultArray = await Promise.all(promise);
            const resultSort = resultArray.sort((a, b) => b.percent - a.percent)
            // console.log(resultSort);

            res.json(resultSort)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getCitiesByRegion(req, res) {
        try {
            const { region_id } = req.query
            const query = {}
            if (region_id) query.region_id = +region_id
            const cities = await voutesModel.aggregate([
                { $match: query }, // Filter documents by region_id or other criteria
                {
                    $group: {
                        _id: "$party_slug", // Group by party_slug
                        // logo: { $first: "$logo" },
                        city_slug: { $first: "$city_slug" },
                        name: { $first: "$name" },
                        region_id: { $first: "$region_id" },
                        count: { $first: "$count" },
                        percent: { $first: "$percent" },
                        position: { $first: "$position" },
                        update_ts: { $first: "$update_ts" },
                        party_slug: { $first: "$party_slug" }
                    }
                }
            ]);
            //   city_slug: { type: String, default: "" },
            //   name: { type: String, default: "" },
            //   region_id: { type: Number, default: 0 },
            //   count: { type: Number, default: 0 },
            //   percent: { type: String, default: "" },
            //   position: { type: Number, default: 0 },
            //   update_ts: { type: Number, default: 0 },
            //   logo: { type: String, default: "" },
            //   party_slug: { type: String, default: "" },
            await res.json(cities)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getCountOfVotes(req, res) {
        try {
            const { city } = req.query

            const countOfVotes = await countOfVotesModel.find({ city_slug: city })
            await res.json(countOfVotes)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new Election