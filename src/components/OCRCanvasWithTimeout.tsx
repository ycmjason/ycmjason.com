import { type HTMLAttributes, useRef, useState } from 'react';
import { clsx } from '../utils/clsx';
import { OCRCanvas } from './OCRCanvas';

export const OCRCanvasWithTimeout = ({
  timeout,
  onRecognized,
  className,
  ...props
}: {
  timeout: number;
  onRecognized: (e: { text: string }) => void;
} & HTMLAttributes<HTMLCanvasElement>) => {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceAbortControllerRef = useRef<AbortController>();
  const transitionEndHandlerRef = useRef<() => void>();

  return (
    <OCRCanvas
      onTransitionEnd={() => {
        transitionEndHandlerRef.current?.();
      }}
      onDrawStart={() => {
        setIsDebouncing(false);
        debounceAbortControllerRef.current?.abort();
      }}
      onDrawEnd={({ canvasController }) => {
        setIsDebouncing(true);

        const abortController = new AbortController();
        debounceAbortControllerRef.current?.abort();
        debounceAbortControllerRef.current = abortController;

        transitionEndHandlerRef.current = async () => {
          // important to clear the transitionEndHandlerRef first to avoid double firing of this handler
          // this is because transtionEnd fires for each property transition
          transitionEndHandlerRef.current = undefined;
          if (abortController.signal.aborted) return;
          const text = await canvasController.recognize();
          if (abortController.signal.aborted) return;

          onRecognized({
            text,
          });
          canvasController.clear();
          setIsDebouncing(false);
        };
      }}
      style={
        isDebouncing
          ? {
              transitionDuration: `${timeout * 0.4}ms`,
              transitionDelay: `${timeout * 0.6}ms`,
              filter: 'opacity(0) blur(var(--blur-xs)',
            }
          : {
              transitionDuration: '350ms',
              filter: 'opacity(1)',
            }
      }
      className={clsx('transition-filter', className)}
      {...props}
    />
  );
};
