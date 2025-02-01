import { useRef } from 'react';

export const useNeverChanging = <T>(x: T): T => {
  const xRef = useRef<T>(x);
  return xRef.current;
};
