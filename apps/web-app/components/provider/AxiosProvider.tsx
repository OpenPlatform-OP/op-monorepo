import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { AxiosInstance } from 'axios';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { axios as axiosConfig } from '@/configs/axios';
import AxiosContext from '@/contexts/AxiosContext';

type Props = {
  children: ReactNode;
};

const AxiosProvider: FC<Props> = ({ children }) => {
  const [axInstance, setAxInstance] = useState<AxiosInstance>(undefined);

  const axInterceptor = useMemo(() => {
    const onRequest = (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      return config;
    };
    const onResponse = (response: AxiosResponse): AxiosResponse => {
      return response;
    };
    const onError = (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    };
    return { onRequest, onResponse, onError };
  }, []);

  useEffect(() => {
    setAxInstance((_) => {
      const instance = axios.create(axiosConfig);
      instance.interceptors.request.use(
        axInterceptor.onRequest,
        axInterceptor.onError
      );
      instance.interceptors.response.use(
        axInterceptor.onResponse,
        axInterceptor.onError
      );
      return instance;
    });
  }, [axInterceptor]);

  return (
    <AxiosContext.Provider value={{ axios: axInstance }}>
      {axInstance && children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
