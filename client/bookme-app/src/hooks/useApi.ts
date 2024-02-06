import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

interface ApiOptions {
  url: string,
  method: string,
  body?: any,
}

const apiURI = "http://localhost:6060"

const apiCall = (options: ApiOptions): TApiResponse => {
  // response state variables
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>('');
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  // import token call
  const { getAccessTokenSilently } = useAuth0();

  const getAPIData = async () => {
    setLoading(true);

    const accessToken = await getAccessTokenSilently();

    // new request object
    const requestOptions: RequestInit = {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      const apiResponse = await fetch(options.url, requestOptions);
      const json = await apiResponse.json();
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(json);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, statusText, data, error, loading };
};

const get = (url: string): TApiResponse => {
  const options: ApiOptions = {
    url: apiURI + url,
    method: "GET",
  }
  return apiCall(options);
}

const post = (url: string, body: any): TApiResponse => {
  const options: ApiOptions = {
    url: apiURI + url,
    method: "POST",
    body: body
  }
  return apiCall(options);
} 

const put = (url: string, body: any): TApiResponse => {
  const options: ApiOptions = {
    url: apiURI + url,
    method: "PUT",
    body: body
  }
  return apiCall(options);
}

export const useApi = {
  get: get,
  post: post,
  put: put,
}