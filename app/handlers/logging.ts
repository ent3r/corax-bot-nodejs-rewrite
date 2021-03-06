import * as winston from "winston";

// Create a new logger to be used for logging
const logger = winston.createLogger({
  // There are two loggers in use. One that writes to the console, and one that writes to a file
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: { debug: "gray" } }),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(
          (info) => `${info.timestamp} - ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
