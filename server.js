const express = require("express");
const conMongo = require("./server/connect");
const morgan = require("morgan");
const route = require("./server/routes");
const schedule = require("node-schedule");
conMongo();

const startTime = new Date(Date.now() + 1000);

schedule.scheduleJob({ start: startTime, rule: "*/1 * * * * *" }, function () {
  console.log("Time for tea!");
});

const app = express();
const PORT = 3000;

app.set("trust proxy", 1);
app.use(express.json());
app.use(morgan("dev"));

app.use("/", route);

app.listen(PORT, () => {
  console.log(`server is going in PORT ${PORT}`);
});
