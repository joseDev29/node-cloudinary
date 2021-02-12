const { Router } = require("express");
const config = require("../config");
const fs = require("fs/promises");
const path = require("path");

const cloudinary = require("../services/cloudinary");

const router = Router();
const Image = require("../models/Image");

router.get("/", async (req, res, next) => {
  const images = await Image.find();
  console.log("---Images list: ", images);
  res.render("images", { images });
});

router.get("/images/add", async (req, res, next) => {
  const images = await Image.find();
  console.log("---Images list: ", images);
  res.render("image_form", { images });
});

router.post("/images/add", async (req, res, next) => {
  //console.log("---Request body: ", req.body);
  //console.log("---Request file: ", req.file);

  const resultUpload = await cloudinary.v2.uploader.upload(req.file.path, {
    public_id: `imagesFolder/${path.basename(
      req.file.path,
      path.extname(req.file.path)
    )}`,
  });
  //console.log("---Result upload cloudinary: ", resultUpload);

  const newImage = new Image({
    title: req.body["img-title"],
    description: req.body["img-description"],
    imageURL: resultUpload.secure_url,
    public_id: resultUpload.public_id,
  });

  await newImage.save();

  await fs.unlink(req.file.path);

  res.redirect("/");
});

router.delete("/images/delete/:image_id", async (req, res, next) => {
  const { image_id } = req.params;

  const deletedImage = await Image.findByIdAndDelete(image_id);

  const result = await cloudinary.v2.uploader.destroy(deletedImage.public_id);

  console.log("---Result delte request: ", result);

  res.status(200).json({
    info: "image deleted",
  });
});

module.exports = router;
