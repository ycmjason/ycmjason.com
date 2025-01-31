import { useEffect, useRef, useState } from 'react';
import { HandwritingRecognizer } from '../handwriting/HandwritingRecognizer';

export const OCRCanvas = () => {
  const handwritingRecognizerRef = useRef<HandwritingRecognizer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 800;
    canvas.height = 400;

    handwritingRecognizerRef.current = new HandwritingRecognizer(canvas);
  }, []);

  const clearCanvas = () => {
    const handwritingRecognizer = handwritingRecognizerRef.current;
    if (!handwritingRecognizer) {
      return;
    }

    handwritingRecognizer.clear();
  };

  const processImage = async () => {
    setIsProcessing(true);
    const handwritingRecognizer = handwritingRecognizerRef.current;

    if (!handwritingRecognizer) {
      return;
    }

    const [bestMatch] = await handwritingRecognizer.recognize();
    if (bestMatch) {
      setRecognizedText(bestMatch);
    }

    setIsProcessing(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 rounded-lg cursor-crosshair bg-white"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={processImage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Canvas
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2"> Recognized Text: </h3>
        {isProcessing ? (
          <div className="text-gray-600"> Processing...</div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-lg min-h-24">
            {recognizedText || 'No text recognized yet. Draw something!'}
          </div>
        )}
      </div>
    </div>
  );
};
