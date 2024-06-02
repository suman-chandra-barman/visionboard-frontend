import { message } from "antd";

const imageUploader = async (file: File) => {
  if (!file) {
    message.error("No file selected.");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=7e74aeef43f1128d0f03678519a7718e`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default imageUploader;
