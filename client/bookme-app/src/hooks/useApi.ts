import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

export interface API {
  reset?: () => void;
  [key: string]: APIMethods | (() => void) | undefined;
}

export interface APIMethods {
  get: () => Promise<void>;
  getOne: (id: string) => Promise<void>;
  post: (body: any) => Promise<void>;
  put: (body: any) => Promise<void>;
}


interface ApiOptions {
  method: string,
  body?: any,
}

const apiURI = "http://localhost:6060/"
const entityPaths = ['businesses', 'services', 'schedules', 'sessions', 'bookings']

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
    return await apiCall(url, options);
  };

  const getOne = async (url: string, id:string): Promise<void> => {
    const options: ApiOptions = {
      method: "GET",
    }
    return await apiCall((url + `/${id}`), options);
  };

  const post = async (url: string, body: any): Promise<void> => {
    const options: ApiOptions = {
      method: "POST",
      body: body
    }
    return await apiCall(url, options);
  };

  const put = async (url: string, body: any): Promise<void> => {
    const options: ApiOptions = {
      method: "PUT",
      body: body
    }
    return await apiCall(url, options);
  };

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
        const string = await apiResponse.text();
        const json = string === "" ? {} : JSON.parse(string);
        setStatus(prevStatus => apiResponse.status);
        setStatusText(prevStatusText => apiResponse.statusText);
        setData(json);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
  };

  const makePaths = (entity: string): APIMethods => {
    const url = apiURI + entity 
    return {
      get: async () => { await get(url)},
      getOne: async (id: string) => {await getOne(url, id)},
      post: async (body: any) => {await post(url, body)},
      put: async (body: any) => {await put(url, body)},
    } 
  }

  let api: API = {
    reset: () => {get(apiURI + "reset")}
  }
  for (let i=0; entityPaths.length>i; i++) {
    const entityPath = entityPaths[i]; // Ensure entityPath is a valid key of API
    api[entityPath] = makePaths(entityPaths[i]);
  }

  const response: TApiResponse = {status, statusText, data, error, loading}

  return [api, response] as const
}