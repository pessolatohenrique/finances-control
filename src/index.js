const express = require("express");
const routes = require("./routes");
const socket = require("./socket");
const cors = require("cors");
const CronWrapper = require("./cron");
const { KafkaConnection } = require("./config");

// necessary to load strategies
require("./auth/strategies");

const app = express();
app.use(cors());
const server = require("http").createServer(app);
routes(app);
global.io = socket(app, server);

CronWrapper.initialize();
KafkaConnection.configure();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
  const badRequestErrors = [
    "SequelizeValidationError",
    "BadRequestError",
    "SequelizeUniqueConstraintError",
    "AggregateError",
  ];

  console.log("Errro!!!", error);

  if (badRequestErrors.includes(error.name)) {
    res.status(400).json(error);
    return next();
  }

  res.status(error.getStatusCode()).json({ message: error.message });
  return next(error);
});

if (process.env.NODE_ENV !== "test") {
  server.listen(3000, () => console.log("Server Started"));
}

module.exports = app;
