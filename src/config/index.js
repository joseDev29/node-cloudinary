console.log("---- Enviroment: ", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  server: {
    port: process.env.PORT,
  },
  db: {
    mongoHost: process.env.MONGO_HOST,
    mongoDBName: process.env.MONGO_DB_NAME,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
