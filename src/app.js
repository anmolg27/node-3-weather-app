const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Anmol Gurung",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Anmol Gurung",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      return res.send(data);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is a help page bro",
    title: "Help",
    name: "Anmol Gurung",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help article not found",
    title: "Help 404",
    name: "Anmol Gurung",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "page not found",
    title: "404",
    name: "Anmol Gurung",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});