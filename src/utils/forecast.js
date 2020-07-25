const request = require("request");
const forecast = (latitiude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e585aa59e2ee37ab87beb5c8477449b3&query=${latitiude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.success === false) {
      callback("unable to find location", undefined);
    } else {
      console.log(body);
      const {
        location: { name },
        current: { weather_descriptions, temperature, feelslike, humidity },
      } = body;
      callback(
        undefined,
        `${weather_descriptions}. The temperature here is ${temperature} degrees but it feels like ${feelslike} degrees out and the humidity is ${humidity}%`
      );
    }
  });
};
module.exports = forecast;
