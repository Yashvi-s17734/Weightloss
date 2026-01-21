require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
    await sequelize.sync();
    console.log("Models Synced");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.log("DB Connection Failed", err);
  }
})();
