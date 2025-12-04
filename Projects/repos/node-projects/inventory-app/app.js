const express = require("express");
const routes = require('./routes/userRoutes'); // Import the routes
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes); // Direct all routes to routes.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Now listening on Port ${PORT}`);
})