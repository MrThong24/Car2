import axiosInstance from "./axios";

const apiCategory = {
  getAllCategory() {
    return axiosInstance.get("/categories");
  },
};
export default apiCategory;
