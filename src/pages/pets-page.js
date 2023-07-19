import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPetsResource } from "../services/message.service";

export const PetsPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const { data, error } = await getPetsResource();

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
          Pets Page
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
          <CodeSnippet title="Public Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};
