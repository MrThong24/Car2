/* eslint-disable no-extra-boolean-cast */
/* eslint-disable object-curly-newline */
import React from "react";
import { Button, Input, Label } from "../../../components";
import "./ChooseImage.scss";

const ChooseImage = ({
  handleClickImageSlide,
  handleDeleteImageSlide,
  control,
  imageSlide,
  position,
  thumbnailPre,
}) => {
  return (
    <div className="chooseImageContent">
      <span className="chooseImageContent-title">Ảnh {position}</span>
      {Object.keys(imageSlide).length <= 0 && !thumbnailPre ? (
        <div className="chooseImageContent-imageBefore">
          <Label htmlFor={`positionSlide-${position}`}>
            <img
              className="chooseImageContent-imageBefore__image"
              src="../.././item.png"
              alt="images"
            />
          </Label>
        </div>
      ) : (
        <>
          <div className="chooseImageContent-imageAfter">
            <div className="chooseImageContent-imageAfter__show">
              <img
                src={
                  !!thumbnailPre
                    ? thumbnailPre
                    : `http://localhost:5000/v1/${imageSlide.sliderImage}`
                }
                alt=""
                className="update-image__thumbnail"
              />
            </div>
            <div className="chooseImageContent-imageAfter__action">
              <Label htmlFor={`positionSlide-${position}`}>Cập nhật</Label>
              <Button
                onClick={(e) => {
                  if (!thumbnailPre) {
                    handleDeleteImageSlide(e, position, true);
                  } else {
                    console.log("hahahah");
                    handleDeleteImageSlide(e, position, false);
                  }
                }}
                buttonStyle="btn--update-delete-editProduct"
              >
                Xóa
              </Button>
            </div>
          </div>
        </>
      )}
      <Input
        id={`positionSlide-${position}`}
        type="file"
        control={control}
        onChange={(e) => {
          handleClickImageSlide(e, position);
        }}
      />
    </div>
  );
};

export default ChooseImage;
