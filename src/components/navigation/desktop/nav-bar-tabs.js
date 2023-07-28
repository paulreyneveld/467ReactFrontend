import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  console.log(user);

  if (user?.role === "user") {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/public" label="Public" />
      <NavBarTab path="/protected" label="Protected" />  
      <NavBarTab path="/pets" label="Pets" />
      <NavBarTab path="/profile" label="Profile" />
      </div>
    );
  }
  else if (user?.role === "admin") {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/pets" label="Pets" />
      <NavBarTab path="/addPet" label="Add Pet" />
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/admin" label="Admin" />
      <NavBarTab path="/public" label="Public" />
      <NavBarTab path="/protected" label="Protected" />
      </div>
    );
  }
  else {
    return (
      <div className="nav-bar__tabs">
      <NavBarTab path="/public" label="Public" />
      <NavBarTab path="/protected" label="Protected" />
      </div>
    );
  }
};
