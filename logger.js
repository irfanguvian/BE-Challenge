const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YY:MM:DD",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "fetch-info" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "full.log" }),
  ],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);

module.exports = logger;
