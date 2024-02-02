import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file) => {
    console.log(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        public_id: result.public_id,
        url: result.url,
      });
    });
  });
};

export { uploads, cloudinary };
