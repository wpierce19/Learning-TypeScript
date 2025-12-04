const {Pool} = require("pg");

//All of the following properties should be read from
//environmental variables
//We're hardcoding them here for simplicity

module.exports = new Pool({
    /*
    host: "localhost", //or wherever the db is located
    user: "wpierce",
    database: "top_users",
    password: "Dakota1993",
    port: 5432 //Default Port
    */
   //Above is the basic way of connecting
   //Below is using a connection URL which most hosting services require
   connectionString: "postgresql://wpierce:Dakota1993@localhost:5432/top_users"
});