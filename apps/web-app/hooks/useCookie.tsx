import CookieKey from '@/enums/cookieKey';
import cookie from 'js-cookie';
import { useMemo } from 'react';

interface CookieOperator<T> {
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
}

const generator = <T,>(key: CookieKey): CookieOperator<T> => {
  return {
    get() {
      return JSON.parse(cookie.get(key)) as T;
    },
    set(value) {
      cookie.set(
        key,
        value instanceof String ? (value as string) : JSON.stringify(value)
      );
    },
    remove() {
      cookie.remove(key);
    },
  };
};

const useCookie = () => {
  const tokenOperator = useMemo(() => {
    return generator<string>(CookieKey.TOKEN);
  }, []);

  return {
    token: tokenOperator,
  };
};

export default useCookie;
