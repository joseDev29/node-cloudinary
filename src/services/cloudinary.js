const cloudinary = require("cloudinary");
const config = require("../config");

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});
module.exports = cloudinary;
