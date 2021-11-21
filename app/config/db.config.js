const { Client } = require("pg");

const client = new Client({
  user: "root",
  host: "localhost",
  database: "shopping",
  password: "",
  port: 26257,
});
client
  .connect()
  .then(() => {
    console.log(`Connected to database Successfully ... !`.cyan.underline.bold);
  })
  .catch((err) => {
    console.log(
      `We have some problem to connect to database ... ! ${err}`.red.underline
        .bold
    );
  });

module.exports = client;
