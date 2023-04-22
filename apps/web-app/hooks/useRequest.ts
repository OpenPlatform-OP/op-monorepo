import { RequestWrapper } from '@/requests/request';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import useAxios from './context/useAxios';
import useAuth from './context/useAuth';

const useRequest = () => {
  const { axios } = useAxios();
  const { jwtToken } = useAuth();

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: RequestWrapper<T>) => {
        const additionalToRequest: AxiosRequestConfig = {};
        if (!requestWrapper.additional?.isPublic) {
          additionalToRequest.headers = { Authorization: `Bearer ${jwtToken}` };
        }
        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => res.data);
      },
    [jwtToken, axios]
  );

  return { fetch };
};

export default useRequest;
