/* eslint-disable operator-linebreak */
import React, { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import apiCategory from "../../api/apiCategory";
import Dropdown from "../Dropdown/Dropdown";
import "./Sidebar.scss";

const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const location = useLocation();

  const history = useHistory();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 6,
    };
  }, [location.search]);

  useEffect(async () => {
    try {
      const categories = await apiCategory.getAllCategory();
      setCategory(categories);
    } catch (error) {
      history.push("/404");
    }
  }, [history]);

  const handleClickCategory = (id) => {
    const result = category.filter((item) => item._id === id);
    setCategoryType(result[0]?.brands);
    const newFilters = { ...queryParams, page: 1, category: id };
    delete newFilters?.categoryType;
    delete newFilters?.search;
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  // handle click categoryType
  const handleClickCategoryType = (id) => {
    const newFilters = { ...queryParams, page: 1, categoryType: id };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <div
      className={`sidebar ${
        location.pathname.includes("detailProduct") ||
        location.pathname.includes("editProduct") ||
        location.pathname.includes("404")
          ? "disable"
          : ""
      }`}
    >
      <Dropdown
        title="Danh Mục"
        option={category}
        onClickCategory={handleClickCategory}
        activeCategory={queryParams.category}
      />
      <Dropdown
        title="Hãng Sản Phẩm"
        option={categoryType}
        onClickCategoryType={handleClickCategoryType}
        activeCategoryType={queryParams.categoryType}
      />
    </div>
  );
};

export default Sidebar;
