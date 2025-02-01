import { type HTMLAttributes, useEffect, useRef } from 'react';
import { HandwritingRecognizerCanvasController } from '../handwriting/HandwritingRecognizerCanvasController';
import { useStableCallback } from '../hooks/useStableCallback';
import { clsx } from '../utils/clsx';

export const OCRCanvas = ({
  onDrawStart,
  onDrawEnd,
  className,
  ...props
}: {
  onDrawStart?: (e: {
    canvasController: HandwritingRecognizerCanvasController;
  }) => void;
  onDrawEnd: (e: {
    canvasController: HandwritingRecognizerCanvasController;
  }) => void;
} & HTMLAttributes<HTMLCanvasElement>) => {
  const canvasControllerRef = useRef<HandwritingRecognizerCanvasController | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrawStartStable = useStableCallback(() => {
    const canvasController = canvasControllerRef.current;
    if (canvasController === null) return;
    onDrawStart?.({ canvasController });
  });
  const onDrawEndStable = useStableCallback(() => {
    const canvasController = canvasControllerRef.current;
    if (canvasController === null) return;
    onDrawEnd({ canvasController });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!(parent instanceof HTMLElement)) return;
    const { width, height } = parent.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    canvasControllerRef.current = new HandwritingRecognizerCanvasController(canvas, {
      onDrawStart: onDrawStartStable,
      onDrawEnd: onDrawEndStable,
    });

    return () => canvasControllerRef.current?.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={clsx('h-full w-full cursor-crosshair', className)}
      {...props}
    />
  );
};
