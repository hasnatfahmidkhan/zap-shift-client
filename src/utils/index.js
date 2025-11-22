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

export const regionsFunc = (serviceCenters) => {
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  return [...new Set(regionsDuplicate)];
};

export const districsByRegions = (region, serviceCenters) => {
  const regionDistrics = serviceCenters?.filter((r) => r.region === region);
  const districs = regionDistrics.map((d) => d.district);
  return districs;
};
