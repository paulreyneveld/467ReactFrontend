import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPetIdResource } from "../services/message.service";
import { useAuth0 } from '@auth0/auth0-react'

export const PetProfilePage = () => {
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getPetIdResource(accessToken, location.pathname.slice(12));

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Pet Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves the pet information from an
              external API.
            </span>
            <span>
              <strong>Only registered visitors can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Private Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};