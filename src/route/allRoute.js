const Router = require("express")
const router = new Router()
const Election = require("../controller/index")

router.get("/top-parties", Election.getTopParties)
router.get("/get-parties/:city?/:region_id?", Election.getPartiesWithCity)
// router.get("/uploadcities", Election.uploadCities)
// router.get("/cities", Election.getCities) 
router.get("/cities/:party?", Election.getCitiesWithParty)
// router.get("/cities-by-region/:region_id?", Election.getCitiesByRegion)

// module.export = router
module.exports = router