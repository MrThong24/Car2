import React from "react";
import Field from "../Field/Field";
import Input from "../Input/Input";
import Label from "../Label/Label";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";

const Form = ({
  control,
  errors,
  optionCategory,
  optionCategoryType,
  handleOnChangeCategoryType,
  handleOnChangeCategory,
}) => {
  return (
    <div>
      <Field>
        <Label htmlFor="name">
          Tên sản phẩm <span className="productContent-form__Obl">*</span>
        </Label>
        <Input
          type="text"
          name="name"
          control={control}
          placeholder="Nhập tên sản phẩm"
        />
        {errors?.name && (
          <div className="productContent-form__check">
            {errors?.name.message}
          </div>
        )}
      </Field>
      <Field>
        <Label htmlFor="category">
          Danh mục sản phẩm <span className="productContent-form__Obl">*</span>
        </Label>
        <Select
          defaultValue="Chọn danh mục sản phẩm"
          name="category"
          options={optionCategory}
          control={control}
          onChange={(e) => {
            handleOnChangeCategory(e);
          }}
        />
        {errors?.category && (
          <div className="productContent-form__check">
            {errors?.category.message}
          </div>
        )}
      </Field>
      <Field>
        <Label htmlFor="categoryType">
          Hãng sản phẩm <span className="productContent-form__Obl">*</span>
        </Label>
        <Select
          defaultValue="Hãng sản xuẩt"
          name="categoryType"
          options={optionCategoryType}
          control={control}
          onChange={(e) => {
            handleOnChangeCategoryType(e);
          }}
        />
        {errors?.categoryType && (
          <div className="productContent-form__check">
            {errors?.categoryType.message}
          </div>
        )}
      </Field>
      <Field>
        <Label htmlFor="price">
          Giá <span className="productContent-form__Obl">*</span>
        </Label>
        <Input
          type="number"
          name="price"
          control={control}
          placeholder="Nhập giá sản phẩm"
        />
        {errors?.price && (
          <div className="productContent-form__check">
            {errors?.price.message}
          </div>
        )}
      </Field>
      <Field>
        <Label htmlFor="description">Mô tả</Label>
        <TextArea
          name="description"
          cols="50"
          control={control}
          placeholder="Nhập mô tả"
        />
        {errors?.description && (
          <div className="productContent-form__check">
            {errors?.description.message}
          </div>
        )}
      </Field>
    </div>
  );
};

export default Form;
