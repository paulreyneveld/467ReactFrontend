import React from "react";
import { PageLayout } from "../components/page-layout";

export const HomePage = () => (
  <PageLayout>
    <div className="features">
      <h2 className="features__title">West Coast Pet Adoption</h2>
      <div className="content__body">

      <p id="page-description">
              <span>
              Welcome! We're an animal rescue agency working across the states of California, Oregon & Washington.
              We believe that there is an animal companion out there for everyone, and we strive to help our clients
              find the relationship that is right for them. Please, sign up today, and start browsing our Pets page 
              to learn more. 
              </span>
      </p>
      </div>
    </div>
  </PageLayout>
);
