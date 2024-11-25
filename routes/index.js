const express = require("express");
const { collection } = require("../db.js");
const _ = require("lodash");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.text("Pixabay here. It works");
});

const routeMap = {
  async getImages(params) {
    const docs  = await collection.pixabay.aggregate([
      { $sample: { size: parseInt(params.limit) || 10 } },
      {
        $project: {
          url: 1,
        },
      },
    ]).toArray();
    return docs.map((doc) => doc.url)
  },
};

for (const method in routeMap) {
  router.get("/" + method, async function (req, res, next) {
    const result = await routeMap[method](req.query);
    res.json({ result });
  });
}

module.exports = router;
