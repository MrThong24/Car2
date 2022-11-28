/* eslint-disable object-curly-newline */
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiCategory from "../../../api/apiCategory";
import "./AddProduct.scss";
import { fileTypes } from "../../../const";
import { Button, Field, Input, Label } from "../../../components";
import Form from "../../../components/Form/Form";

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
  image: yup.string().required("Ảnh minh họa không được bỏ trống"),
});

const AddProduct = ({ onClickClose, onSubmit }) => {
  const [category, setCategory] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const [image, setImage] = useState();
  const [typeImage, setTypeImage] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  const handleOnSubmit = (values) => {
    if (!typeImage) {
      onSubmit(values, image);
    }
  };
  const handleClose = () => {
    onClickClose();
  };
  useEffect(async () => {
    try {
      const categories = await apiCategory.getAllCategory();
      setCategory(categories);
    } catch (error) {
      error();
    }
  }, []);
  const OptionCategory = useMemo(() => {
    const OptionNew = category.map((item) => ({
      name: item.name,
      value: item._id,
    }));
    return OptionNew;
  }, [category]);
  const OptionCategoryType = useMemo(() => {
    const OptionNew = categoryType.map((item) => ({
      name: item.name,
      value: item._id,
    }));
    return OptionNew;
  }, [categoryType]);

  const handleOnChangeCategory = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
    setValue("categoryType", "", { shouldValidate: false });
    const newData = category.filter((item) => item._id === e.target.value);
    setCategoryType(newData[0]?.brands);
  };
  const handleOnChangeCategoryType = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
  };
  const handleClickImage = (e) => {
    const file = e.target.files[0];
    if (fileTypes.includes(file?.type)) {
      setValue(e.target.name, e.target.value, { shouldValidate: true });
      file.preview = URL.createObjectURL(file);
      setTypeImage(false);
      setImage(file);
    } else {
      setValue(e.target.name, e.target.value, { shouldValidate: true });
      setImage("");
      setTypeImage(true);
    }
  };
  return (
    <div className="productContent">
      <div className="productContent-header">
        <span>Thêm sản phẩm</span>
        <i
          className="bx bx-x-circle"
          onClick={() => handleClose()}
          aria-hidden="true"
        />
      </div>
      <form
        className="productContent-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Form
          className="editProductContent-form"
          control={control}
          optionCategory={OptionCategory}
          optionCategoryType={OptionCategoryType}
          handleOnChangeCategory={handleOnChangeCategory}
          handleOnChangeCategoryType={handleOnChangeCategoryType}
          errors={errors}
        />
        <Field>
          <Label className="productContent-form__labelFile" htmlFor="image">
            Thêm ảnh minh họa{" "}
            <span className="productContent-form__Obl">*</span>
          </Label>
          <Input
            className="productContent-form__addFile"
            name="image"
            type="file"
            onChange={(e) => {
              handleClickImage(e);
            }}
            value=""
            control={control}
          />
          {errors?.image && (
            <div className="productContent-form__check">
              {errors?.image.message}
            </div>
          )}
          {image && (
            <div className="productContent-form__box">
              <img
                src={image.preview}
                alt=""
                className="productContent-form__img"
              />
            </div>
          )}
          {typeImage && (
            <div className="productContent-form__check">
              Định dạng không đúng
            </div>
          )}
        </Field>
        <div className="productContent-form__active">
          <Button buttonStyle="btn--close-addProduct" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="submit" buttonStyle="btn--add-addProduct">
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
