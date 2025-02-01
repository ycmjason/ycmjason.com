export type Debounced<T extends (this: any, ...args: any[]) => void> = ((
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

export function debounce<T extends (this: any, ...args: any[]) => void>(
  func: T,
  waitMilliseconds: number,
): Debounced<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => clearTimeout(timeoutId);

  return Object.assign(
    function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      cancel();

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        func.apply(this, args);
      }, waitMilliseconds);
    },
    { cancel },
  );
}
