const sharp = require("sharp");
const fs = require("fs");

const configImgEditing = require("./config");

async function proccessImage(image, index) {
  const { width, height, brightness } = configImgEditing;

  await sharp(`images/${image}`)
    .resize(width, height)
    .modulate({
      brightness,
    })
    .jpeg()
    .toFile(`images-out/sampleout${index}.jpg`);
}

async function initApp() {
  try {
    fs.readdir("images", (_, images) => {
      images.forEach((image, index) => {
        proccessImage(image, index);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
initApp();
