const Router = require("express")
const router = new Router()
const Election = require("../controller/index")

router.get("/cities", Election.getCities)

// module.export = router
module.exports = router