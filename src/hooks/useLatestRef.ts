import { type MutableRefObject, useRef } from 'react';

export const useLatestRef = <T>(value: T): Readonly<MutableRefObject<T>> => {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
};
