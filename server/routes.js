const router = require("express").Router();
const Axios = require("axios");
const DataCovid = require("./model");

router.get("/", async (req, res) => {
  const data = await DataCovid.find();
  res.json({
    data,
  });
});

router.get("/fetch", async (req, res) => {
  try {
    const findData = await DataCovid().findOne();
    let confirm = 0;
    let death = 0;
    let recovery = 0;
    await Axios({
      method: "get",
      url: "https://api.kawalcorona.com",
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.attributes.Confirmed) {
          confirm += data.attributes.Confirmed;
        }
        if (data.attributes.Deaths) {
          death += data.attributes.Deaths;
        }
        if (data.attributes.Recovered) {
          recovery += data.attributes.Recovered;
        }
      });
    });
    const data = new DataCovid({
      positif: confirm,
      death: death,
      recovered: recovery,
    });
    await data.save();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "API Error",
      error,
    });
  }
});

module.exports = router;
