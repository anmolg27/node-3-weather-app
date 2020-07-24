const request = require("request");
const forecast = (latitiude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e585aa59e2ee37ab87beb5c8477449b3&query=${latitiude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.success === false) {
      callback("unable to find location", undefined);
    } else {
      const {
        location: { name },
        current: { weather_descriptions, temperature, feelslike },
      } = body;
      callback(undefined, {
        location: name,
        description: weather_descriptions[0],
        temperature: temperature,
        feels_like: feelslike,
      });
    }
  });
};
module.exports = forecast;
