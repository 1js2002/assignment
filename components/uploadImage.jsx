import React, { useState } from "react";

const UploadImage = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      try {
        console.log("Uploading image...");
        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "aqtrvven");
        data.append("cloud_name", "shiraanlio");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/shiraanlio/image/upload",
          {
            method: "post",
            body: data,
          }
        );

        const imageData = await response.json();
        setIsUploading(false);
        setIsUploaded(true);
        console.log(imageData.url.toString());
        onImageUpload(imageData.url.toString() || "");
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-1 md:p-7 mx-auto rounded bg-white shadow-lg">
      <label htmlFor="formFile" className="block mb-4">
        Upload Image:
      </label>
      <input
        className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-2"
        type="file"
        id="formFile"
        multiple
        disabled={isUploading}
        onChange={handleImageUpload}
      />

      {isUploading ? (
        <p className="text-blue-600">Uploading...</p>
      ) : (
        <>
          {isUploaded ? (
            <p className="text-green-600">Uploaded successfully!</p>
          ) : (
            <p className="text-gray-500">No file selected</p>
          )}
        </>
      )}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default UploadImage;
