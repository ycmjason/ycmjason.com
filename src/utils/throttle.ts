export function throttle<T extends (...args: any[]) => void>(
  func: T,
  waitMilliseconds: number,
  options: { leading: boolean; trailing: boolean } = { leading: true, trailing: true },
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let lastArgs: Parameters<T> | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    const currentTime = Date.now();

    // If this is the first call or leading is true
    if (!lastCallTime && options.leading) {
      lastCallTime = currentTime;
      func.apply(this, args);
      return;
    }

    const remainingTime = lastCallTime ? waitMilliseconds - (currentTime - lastCallTime) : 0;

    if (remainingTime <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      lastCallTime = currentTime;
      func.apply(this, args);
    } else if (options.trailing && !timeoutId) {
      lastArgs = args;
      timeoutId = setTimeout(() => {
        lastCallTime = options.leading ? Date.now() : undefined;
        timeoutId = undefined;
        // biome-ignore lint/style/noNonNullAssertion: must be defined
        func.apply(this, lastArgs!);
        lastArgs = undefined;
      }, remainingTime);
    }
  };
}
