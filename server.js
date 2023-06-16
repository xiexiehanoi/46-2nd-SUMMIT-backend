require("dotenv").config();

const { createApp } = require("./app.js");
const { dataSource } = require("./models/dataSource.js");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      dataSource.destroy();
    });

  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

startServer();
