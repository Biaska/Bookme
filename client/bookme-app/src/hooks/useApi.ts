import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

interface ApiOptions {
  method: string,
  body?: any,
}

const apiURI = "http://localhost:6060"

export function useAPI() {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>('');
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  // import token call
  const { getAccessTokenSilently } = useAuth0();

    const get = async (url: string): Promise<void> => {
    const options: ApiOptions = {
      method: "GET",
    }
    return await apiCall(apiURI + url, options);
  }

  const post = async (url: string, body: any): Promise<void> => {
    const options: ApiOptions = {
      method: "POST",
      body: body
    }
    return await apiCall(apiURI + url, options);
  } 

  const put = async (url: string, body: any): Promise<void> => {
    const options: ApiOptions = {
      method: "PUT",
      body: body
    }
    return await apiCall(apiURI + url, options);
  }

  const apiCall = async (url: string, options: ApiOptions): Promise<void> => {
    // response state variables
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
        const apiResponse = await fetch(url, requestOptions);
        const json = await apiResponse.json();
        setStatus(apiResponse.status);
        setStatusText(apiResponse.statusText);
        setData(json);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
  };
  return { get, put, post, status, statusText, data, error, loading }
}