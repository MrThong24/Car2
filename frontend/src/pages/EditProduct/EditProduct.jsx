/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Grid, Modal } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useHistory } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import Form from "../../components/Form/Form";
import { Button, Field, Input, Label, ModalContent } from "../../components";
import "./EditProduct.scss";
import ChooseImage from "./components/ChooseImage";
import apiProduct from "../../api/apiProduct";
import { fileTypes } from "../../const";

const schema = yup.object({
  name: yup.string().required("Nhập tên xe"),
  category: yup.string().required("Nhập loại xe"),
  categoryType: yup.string().required("Nhập hãng xe"),
  price: yup
    .number()
    .required("Nhap giá")
    .positive("Giá tiền phải lớn hơn 0")
    .max(10000000000, "Nhập nhỏ hơn 10000000000")
    .min(10000, "Nhập lớn hơn 10000")
    .typeError("Vui lòng nhập giá tiền"),
  description: yup.string().max(500, "Nhập nhỏ hơn 500"),
});

const EditProduct = () => {
  const [categorys, setCategory] = useState([]);
  const history = useHistory();
  const [categoryTypes, setCategoryType] = useState([]);
  const [product, setProduct] = useState([]);
  const [typeImage, setTypeImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);
  const [image, setImage] = useState({
    file: {},
    previewServer: "",
  });

  const [imageSlider, setImageSlider] = useState([
    {
      image: null,
      position: 1,
    },
    {
      image: null,
      position: 2,
    },
    {
      image: null,
      position: 3,
    },
    {
      image: null,
      position: 4,
    },
  ]);

  const { id } = useParams();
  const DEFAULT_IMG = `http://localhost:5000/v1/${image.previewServer}`;
  const [resThumbnails, setResThumbnails] = useState([]);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await apiProduct.getProductById(id);
        setProduct(res);
        const categories = await apiCategory.getAllCategory();
        setCategory(categories);
        const newData = categories.filter(
          (item) => item._id === res.category._id
        );
        setImage({ ...image, previewServer: res.image });
        setCategoryType(newData[0]?.brands);
        reset({
          name: res.name,
          price: res.price,
          category: res.category._id,
          categoryType: res.categoryType._id,
          description: res.description,
        });
        setResThumbnails(res.slider);
        setLoading(true);
      } catch (error) {
        history.push("/404");
      }
    })();
  }, []);

  const OptionCategory = useMemo(() => {
    const OptionNew = categorys.map((item) => ({
      name: item.name,
      value: item._id,
    }));
    return OptionNew;
  }, [categorys]);
  const OptionCategoryType = useMemo(() => {
    const OptionNew = categoryTypes.map((item) => ({
      name: item.name,
      value: item._id,
    }));
    return OptionNew;
  }, [categoryTypes]);

  const handleOnChangeCategory = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
    const newData = categorys.filter((item) => item._id === e.target.value);
    setCategoryType(newData[0]?.brands);
  };
  const handleOnChangeCategoryType = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
  };
  const handleClickImageSlide = (e, pos) => {
    const file = e.target.files[0];
    if (fileTypes.includes(file?.type)) {
      const newImageSlider = [...imageSlider];
      const findIndex = newImageSlider.findIndex(
        (imageSlide) => imageSlide.position === pos
      );
      if (findIndex >= 0) {
        file.preview = URL.createObjectURL(file);
        newImageSlider[pos - 1] = {
          image: file,
          position: pos,
        };
      }
      setImageSlider(newImageSlider);

      setTypeImage(false);
    }
  };
  const handleClickImage = (e) => {
    const files = e.target.files[0];
    if (fileTypes.includes(files?.type)) {
      setValue(e.target.name, e.target.value, { shouldValidate: true });
      files.preview = URL.createObjectURL(files);
      setImage({
        file: files,
        previewServer: "",
      });
      setTypeImage(false);
    } else {
      setTypeImage(true);
    }
  };
  const handleDeleteImageSlide = (e, pos, bool) => {
    if (bool) {
      const newResThumbnails = [...resThumbnails];
      newResThumbnails[pos - 1] = {
        ...newResThumbnails[pos - 1],
        sliderImage: "",
      };
      setResThumbnails(newResThumbnails);
    } else {
      const newImageSlider = [...imageSlider];
      newImageSlider[pos - 1] = {
        image: null,
        position: pos,
      };
      setImageSlider(newImageSlider);
    }
  };
  const handleClose = () => {
    setOpenContentModal(false);
  };

  const handleOnsubmit = async (values) => {
    // const newValues = { ...values };
    const { name, category, categoryType, price, description } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("typeProduct", categoryType);
    formData.append("description", description);
    if (image.file?.name !== undefined) {
      formData.append("image", image.file, image.file.name);
    }
    // th ko edit slider
    if (resThumbnails.length <= 0) {
      imageSlider.forEach((item) => {
        if (item.image?.name !== undefined) {
          formData.append("slider", item?.image, item?.image?.name);
          formData.append("position", item.position);
        } else {
          formData.append("noposition", item.position);
        }
      });
    } else {
      imageSlider.forEach((item, index) => {
        if (item.image?.name) {
          formData.append("slider", item.image, item.image.name);
          formData.append("position", item.position);
        } else if (resThumbnails[index]?.sliderImage === "") {
          formData.append("noposition", item.position);
        }
      });
    }

    try {
      await apiProduct.editProductById(id, formData);
      setOpenContentModal(true);
      setTimeout(() => {
        history.push(`/homePage/detailProduct/${product._id}`);
      }, 1000);
    } catch (error) {
      history.push("/404");
    }
  };

  return (
    <>
      {loading && (
        <div className="editContent">
          <form
            className="editProductContent"
            onSubmit={handleSubmit(handleOnsubmit)}
          >
            <div className="editProductContent-left">
              <div className="editProductContent-left__title">
                Thông tin sản phẩm
              </div>
              <Form
                className="editProductContent-form"
                control={control}
                optionCategory={OptionCategory}
                optionCategoryType={OptionCategoryType}
                handleOnChangeCategory={handleOnChangeCategory}
                handleOnChangeCategoryType={handleOnChangeCategoryType}
                errors={errors}
              />
              <div className="editProductContent-left__active">
                <Button
                  buttonStyle="btn--close-editProduct"
                  onClick={history.goBack}
                >
                  Hủy
                </Button>
                <Button type="submit" buttonStyle="btn--add-editProduct">
                  Lưu
                </Button>
              </div>
            </div>
            <div className="editProductContent-right">
              <Field>
                <Label htmlFor="image">
                  Ảnh minh họa{" "}
                  <span className="editProductContent-right__Obl">*</span>
                </Label>
                <Input
                  className="editProductContent-right__addFile"
                  name="image"
                  type="file"
                  value=""
                  control={control}
                  onChange={(e) => {
                    handleClickImage(e);
                  }}
                />
                <div className="editProductContent-right__box">
                  {typeImage ? (
                    <div className="productContent-form__check">
                      Định dạng không đúng
                    </div>
                  ) : (
                    <img
                      src={`${image?.file?.preview || DEFAULT_IMG} `}
                      alt=""
                      className="editProductContent-right__img"
                    />
                  )}
                </div>
              </Field>
              <Field>
                <Label htmlFor="slide">Ảnh slide</Label>
                <div className="editProductContent-right__boxSlide">
                  {resThumbnails?.length <= 4 && (
                    <>
                      {Array.from(Array(4).keys()).map((item) => (
                        <Grid item xs={6} key={item}>
                          {resThumbnails[item]?.position === item + 1 &&
                          resThumbnails[item].sliderImage ? (
                            // eslint-disable-next-line max-len
                            <ChooseImage
                              key={item.position}
                              control={control}
                              imageSlide={resThumbnails[item]}
                              position={item + 1}
                              imageAdd="item.png"
                              thumbnailPre={imageSlider[item].image?.preview}
                              handleClickImageSlide={handleClickImageSlide}
                              handleDeleteImageSlide={handleDeleteImageSlide}
                            />
                          ) : (
                            // eslint-disable-next-line indent
                            // eslint-disable-next-line max-len
                            <ChooseImage
                              key={item.position}
                              control={control}
                              imageSlide={{}}
                              position={item + 1}
                              imageAdd="item.png"
                              handleClickImageSlide={handleClickImageSlide}
                              handleDeleteImageSlide={handleDeleteImageSlide}
                              thumbnailPre={imageSlider[item].image?.preview}
                            />
                          )}
                        </Grid>
                      ))}
                    </>
                  )}
                </div>
              </Field>
            </div>
          </form>
        </div>
      )}
      <Modal open={openContentModal} onClose={handleClose}>
        <div className="edit-modal">
          <ModalContent
            onClickClose={handleClose}
            title="Update thành công !"
            image="../../success.png"
          />
        </div>
      </Modal>
    </>
  );
};

export default EditProduct;
