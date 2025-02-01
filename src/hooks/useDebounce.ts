import { useCallback } from 'react';
import { type Debounced, debounce } from '../utils/debounce';
import { useNeverChanging } from './useNeverChanging';
import { useStableCallback } from './useStableCallback';

export function useDebounce<T extends (this: any, ...args: any[]) => void>(
  cb: T,
  delay: number,
): Debounced<T> {
  const callback = useStableCallback(cb);
  const delayNeverChanging = useNeverChanging(delay);

  return useCallback(debounce(callback, delayNeverChanging), []);
}
