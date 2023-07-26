import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navbar } from "../components/Navbar"

export const Profile = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }
  console.log(user);
  return (
      <div>
        <Navbar />
        <h1>
          Profile Page
        </h1>

          <p >
              You can use the ID Token to get the profile
              information of an authenticated user.

              Only authenticated users can access this page.
  
          </p>
            <div>
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
                <h2 className="profile__title">{user.name}</h2>
                {user.email}
            </div>
      </div>

  );
};
