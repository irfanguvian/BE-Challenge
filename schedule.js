const schedule = require("node-schedule");
const Axios = require("axios");
const DataCovid = require("./server/model");
const logger = require("./logger");
schedule.scheduleJob("59 23 * * *", async () => {
  try {
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
    const find = await DataCovid.findOne({
      positif: confirm,
      death: death,
      recovered: recovery,
    });
    if (find === null) {
      const data = new DataCovid({
        positif: confirm,
        death: death,
        recovered: recovery,
      });
      await data.save();
      logger.log({
        level: "info",
        message: "Success",
        additional: "Data Fetch Completed , new data has been created",
        are: "passed along",
      });
    } else {
      logger.log({
        level: "info",
        message: "Success",
        additional: "Data Fetch not completed , there is no updated data",
        are: "passed along",
      });
    }
  } catch (error) {
    logger.error(new Error("Server Error or " + error.message));
  }
});

module.exports = schedule;
