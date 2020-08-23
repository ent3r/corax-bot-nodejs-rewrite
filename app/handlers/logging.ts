import * as winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(
          (info) => `${info.timestamp} - ${info.level}: ${info.message}`
        )
      ),
    }),
    new winston.transports.File({
      dirname: "logs",
      filename: "logging.log",
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(
          (info) => `${info.timestamp} - ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
