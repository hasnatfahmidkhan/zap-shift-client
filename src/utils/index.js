import axios from "axios";

export const uploadImage = async (imgFile) => {
  //* create new formData instance
  const formData = new FormData();
  //* append img file into formData
  formData.append("image", imgFile);
  //* hosting the img
  const res = await axios.post(import.meta.env.VITE_IMG_HOSTING, formData);
  return res.data?.data.url;
};
