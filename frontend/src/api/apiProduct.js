import axiosInstance from "./axios";

const apiProduct = {
  getAllProduct(queryParams) {
    return axiosInstance.get("/product", {
      params: queryParams,
    });
  },
  async addProduct(formdata) {
    const dataProduct = await axiosInstance.post("/product", formdata, {
      headers: { "content-type": "multipart/form-data" },
    });
    return dataProduct;
  },
  async getProductById(id) {
    const product = await axiosInstance.get(`/product/detail-product/${id}`);
    return product;
  },
  async deleteProductById(id) {
    const product = await axiosInstance.delete(`/product/delete/${id}`);
    return product;
  },
  async getSuggestById(object) {
    const product = await axiosInstance.get(`/product/product-suggest`, {
      params: object,
    });
    return product;
  },
  async editProductById(id, formData) {
    await axiosInstance.put(`/product/edit-product/${id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
};
export default apiProduct;
