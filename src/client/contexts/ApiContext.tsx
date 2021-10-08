import React, { useMemo, FC, createContext } from "react";
import axios, { AxiosInstance } from "axios";
import useToken from "../hooks/useToken";

// import useToken from "../hooks/useToken";

const ApiContext = createContext<AxiosInstance>(axios);

interface IProps {
  baseURL: string;
}

export const ApiProvider: FC<IProps> = ({ baseURL, children }) => {
    
  const token = useToken();

  const client = useMemo(() => {
    const instance = axios.create({ baseURL });

    if (token) {
      (instance.defaults.headers.common as any).Authorization = `Bearer ${token}`;
    }

    return instance;
  }, [baseURL, token]);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
};

export default ApiContext;
