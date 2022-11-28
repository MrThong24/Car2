import React, { useEffect, useMemo, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { number } from "../../const";
import apiProduct from "../../api/apiProduct";
import useLoading from "../../hooks/useLoading";
import { CardProduct } from "../../components";
import "./HomePage.scss";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const [totalPage, setTotalPage] = useState(0);
  const [showLoader, hideLoader] = useLoading();
  const [value, setValue] = useState("");

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

  return (
    <div className="contentHomePage">
      <div className="contentHomePage-header">
        <div className="contentHomePage-header__search">
          <i className="bx bx-search" />
          <input
            value={value}
            onChange={handleChangeSearch}
            type="text"
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="contentHomePage-body">
        <Grid className="contentHomePage-body__list" container direction="row">
          {product.length > 0 ? (
            <>
              {product?.map((item) => (
                <CardProduct key={item._id} product={item} show={item._id} />
              ))}
            </>
          ) : (
            <span className="contentHomePage-body__notFound">
              Không có sản phẩm nào
            </span>
          )}
        </Grid>
        {product.length > 0 ? (
          <div className="contentHomePage-body__pagination">
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

export default HomePage;
