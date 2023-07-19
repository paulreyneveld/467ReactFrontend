import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getPetsResource = async () => {
  const config = {
    url: `${apiServerUrl}/pets`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// export const getUsersResource = async () => {
//   const config = {
//     method: 'GET',
//     url: 'https://467petadoption.us.auth0.com/api/v2/users',
//     params: {q: 'email:"jane@exampleco.com"', search_engine: 'v3'},
//     headers: {authorization: 'Bearer {yourMgmtApiAccessToken}'}
//   };

//   const { data, error } = await callExternalApi({ config });

//   return {
//     data: data || null,
//     error,
//   };
// };

export const getUsersResource = async (accessToken) => {
  const config = {
    url: `https://pet-adoption467.us.auth0.com/userinfo`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getAdminResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/pets/test`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
