// UploadImage.js
import React from "react";

const UploadImage = ({ register, onImageUpload }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "piyushproj");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await response.json();
        console.log(imageData.url.toString());
        onImageUpload(imageData.url.toString() || "");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-1 md:p-7 mx-auto rounded bg-white shadow-lg">
      <div>
        <input
          className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
          type="file"
          id="formFile"
          multiple
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default UploadImage;
