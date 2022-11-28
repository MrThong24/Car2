import React, { useState } from "react";
import "./Dropdown.scss";

const Dropdown = ({
  title,
  option,
  onClickCategory,
  onClickCategoryType,
  activeCategory,
  activeCategoryType,
}) => {
  const [activeDrop, setActiveDrop] = useState(true);
  const handleDrop = () => {
    setActiveDrop((pre) => !pre);
  };
  const handelClick = (id) => {
    if (onClickCategoryType) {
      onClickCategoryType(id);
    }
    if (onClickCategory) {
      onClickCategory(id);
    }
  };
  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={handleDrop} aria-hidden="true">
        <span className="">{title}</span>
        {activeDrop ? (
          <i className="bx bx-caret-down" />
        ) : (
          <i className="bx bx-caret-up" />
        )}
      </div>
      {activeDrop && (
        <div className="dropdown-box">
          <ul className="dropdown-box__list">
            <li
              className={
                !activeCategory && !activeCategoryType
                  ? "dropdown-box__item active"
                  : "dropdown-box__item"
              }
              onClick={() => handelClick()}
              aria-hidden="true"
            >
              Tất cả
            </li>
            {option?.map((item) => (
              <li
                key={item.name}
                onClick={() => handelClick(item._id)}
                className={
                  activeCategory === item._id || activeCategoryType === item._id
                    ? "dropdown-box__item active"
                    : "dropdown-box__item"
                }
                aria-hidden="true"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
