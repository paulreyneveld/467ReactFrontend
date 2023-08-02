import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {

  const { user } = useAuth0();

  if (user?.role === "user") {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/" label="Home" />  
      <NavBarTab path="/pets" label="Pets" />
      <NavBarTab path="/profile" label="Profile" />
      </div>
    );
  }
  else if (user?.role === "admin") {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/" label="Home" />  
      <NavBarTab path="/pets" label="Pets" />
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/addPet" label="Add Pet" />
      </div>
    );
  }
  else {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/" label="Home" />  
      <NavBarTab path="/pets" label="Pets" />
      </div>
    );
  }
};
