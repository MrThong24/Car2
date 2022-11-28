/* eslint-disable object-curly-newline */
import React, { useEffect, useMemo, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import "./ManagerProduct.scss";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import apiProduct from "../../api/apiProduct";
import useLoading from "../../hooks/useLoading";
import {
  CardProduct,
  Modal,
  ModalContent,
  ModalDelete,
} from "../../components";
import AddProduct from "./components/AddProduct";
import { number } from "../../const";

const ManagerProduct = () => {
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0);
  const [showLoader, hideLoader] = useLoading();
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || number.limitDefault,
    };
  }, [location.search]);

  const fetchData = async () => {
    const { products, count } = await apiProduct.getAllProduct(queryParams);
    setTotalPage(Math.ceil(count / queryParams.limit)); // return number max
    setProduct(products);
  };

  useEffect(() => {
    showLoader();
    fetchData();
    hideLoader();
  }, [queryParams]);

  const handleChangeSearch = (e) => {
    if (e.target.value === "") {
      delete queryParams.search;
    }
    const input = e.currentTarget.value;
    if (/^[a-zA-Z0-9 ]+$/.test(input) || input === "") {
      setValue(input);
    }
    setTimeout(() => {
      history.push({
        pathname: location.pathname,
        search: queryString.stringify({
          ...queryParams,
          page: 1,
          limit: number.limitDefault,
          search: e.target.value,
        }),
      });
    }, number.timeSearch);
  };

  const handleOnPageChange = (e, crPage) => {
    history.push({
      pathname: location.pathname,
      search: queryString.stringify({ ...queryParams, page: crPage }),
    });
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenContentModal(false);
    setShowModalConfirm(false);
    setShowModalSuccess(false);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const products = await apiProduct.getProductById(id);
      setProductId(products);
    } catch (error) {
      history.push("/404");
    }
    setShowModalConfirm(true);
  };

  const handleDelete = async (id) => {
    try {
      await apiProduct.deleteProductById(id);
      setShowModalConfirm(false);
      fetchData();
      setShowModalSuccess(true);
    } catch (error) {
      history.push("/404");
    }
  };
  const handleOnSubmit = async (values, image) => {
    const { name, category, categoryType, price, description } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("categoryType", categoryType);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image, image.name);
    try {
      const dataProductAdd = await apiProduct.addProduct(formData); //
      setOpenContentModal(true);
      setOpenModal(false);
      setTimeout(() => {
        history.push(`/homePage/detailProduct/${dataProductAdd._id}`);
        setOpenContentModal(true);
      }, 1000);
    } catch (error) {
      history.push("/404");
    }
  };

  return (
    <div className="content">
      <div className="content-header">
        <button
          type="button"
          className="content-header__btn"
          onClick={handleClickOpen}
        >
          Thêm sản phẩm
        </button>
        <Modal open={openModal} onClose={handleClose}>
          <AddProduct onSubmit={handleOnSubmit} onClickClose={handleClose} />
        </Modal>
        <Modal open={openContentModal} onClose={handleClose}>
          <ModalContent
            onClickClose={handleClose}
            title="Thêm thành công !"
            image="./success.png"
          />
        </Modal>
        <div className="content-header__search">
          <i className="bx bx-search" />
          <input
            value={value}
            onChange={handleChangeSearch}
            type="text"
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="content-body">
        <Grid className="content-body__list" container direction="row">
          {product.length > 0 ? (
            <>
              {product?.map((item) => (
                <CardProduct
                  key={item._id}
                  product={item}
                  handleDeleteConfirm={handleDeleteConfirm}
                />
              ))}
            </>
          ) : (
            <span className="content-body__notFound">
              Không có sản phẩm nào
            </span>
          )}
        </Grid>
        <Modal open={showModalConfirm} onClose={handleClose}>
          <ModalDelete
            product={productId}
            onClickClose={handleClose}
            handleDelete={handleDelete}
          />
        </Modal>
        <Modal open={showModalSuccess} onClose={handleClose}>
          <ModalContent
            onClickClose={handleClose}
            title="Xóa sản phẩm thành công"
            image="./delete.png"
          />
        </Modal>

        {product.length > 0 ? (
          <div className="content-body__pagination">
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={handleOnPageChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManagerProduct;
