import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <h1 style={{color: "white"}}>Pet Adoption</h1>
      </NavLink>
    </div>
  );
};
