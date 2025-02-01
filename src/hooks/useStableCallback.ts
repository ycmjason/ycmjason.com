import { useCallback } from 'react';
import { useLatestRef } from './useLatestRef';

export const useStableCallback = <T extends (...args: any[]) => unknown>(cb: T): T => {
  const cbRef = useLatestRef(cb);
  return useCallback(((...args) => cbRef.current(...args)) as T, []);
};
