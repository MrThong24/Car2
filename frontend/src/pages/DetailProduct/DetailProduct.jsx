/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./DetailProduct.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardProduct } from "../../components";
import apiProduct from "../../api/apiProduct";
import useLoading from "../../hooks/useLoading";

const DetailProduct = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const { id } = useParams();
  const history = useHistory();
  const [productById, setProductById] = useState({});
  const [suggestCategory, setSuggestCategory] = useState([]);
  const [showLoader, hideLoader] = useLoading();
  const fetchData = async () => {
    const product = await apiProduct.getProductById(id);
    const category = await apiProduct.getSuggestById({
      id: product._id,
      category: product.category._id,
    });
    setProductById(product);
    setSuggestCategory(category);
  };
  useEffect(() => {
    showLoader();
    fetchData();
    hideLoader();
  }, [id]);

  const result = productById.slider?.filter((item) => item.sliderImage !== "");

  return (
    <div className="detailContent">
      <div className="detailBox">
        <div className="detailBox-header">
          <button
            type="button"
            className="detailBox-header__btn"
            onClick={history.goBack}
          >
            <i className="bx bx-arrow-back" />
            <p>Quay lại</p>
          </button>
        </div>
        <div className="detailBox-body">
          <div className="detailBox-body__detail">
            <h2>{productById.name}</h2>
            <p>Danh Mục: {productById.category?.name}</p>
            <p>Hãng Sản Xuất: {productById.categoryType?.name}</p>
            <p>Giá Sản Phẩm: $ {productById.price?.toLocaleString()}</p>
            <p>
              Mô tả sản phẩm: <br />
              {productById.description}
            </p>
          </div>
          <div className="detailBox-body__slide">
            {productById.slider?.length == 0 ? (
              <img
                src={`http://localhost:5000/v1/${productById.image}`}
                alt=""
              />
            ) : (
              <>
                <Slider {...settings}>
                  {result?.map((item) => (
                    <div className="detailBox-body__slide__item">
                      <img
                        src={"http://localhost:5000/v1/" + item.sliderImage}
                        alt=""
                      />
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </div>
        </div>
        <div className="detailBox-footer">
          <div className="detailBox-footer__list">
            {suggestCategory.length > 0 ? (
              <>
                <h2 className="detailBox-footer__title">Gợi ý cho bạn</h2>
                <div className="detailBox-footer__items">
                  {suggestCategory.map((item) => (
                    <CardProduct
                      key={item._id}
                      product={item}
                      show={item._id}
                    />
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
