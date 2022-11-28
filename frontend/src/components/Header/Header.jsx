import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <NavLink to="/homePage" className="header-logo__link">
          <div className="header-logo__box">
            <h2 className="header-logo__name">BCT</h2>
          </div>
        </NavLink>
      </div>
      <nav className="header-nav">
        <ul className="header-nav__list">
          <li className="header-nav__items">
            <NavLink to="/homePage" className="header-nav__link">
              SẢN PHẨM
            </NavLink>
          </li>
          <li className="header-nav__items">
            <NavLink to="/managerProduct" className="header-nav__link">
              QUẢN LÝ SẢN PHẨM
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
