interface RecognitionOptions {
  language?: 'en';
  numOfWords?: number;
  numOfReturn?: number;
  width?: number;
  height?: number;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

type GoogleHandwritingApiResult =
  | [statusMessage: 'SUCCESS', result: [id: string, matches: string[]][]]
  | [statusMessage: string];

const GOOGLE_HANDWRITING_API =
  'https://www.google.com/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8';

export type HandwritingRecognizerCanvasControllerOptions = {
  lineWidth?: number;
  onDrawStart?: () => void;
  onDrawEnd?: () => void;
};

const DEFAULT_LINE_WIDTH = 3;
export class HandwritingRecognizerCanvasController {
  canvas: HTMLCanvasElement;
  #destroyed = false;
  #canvasContext: CanvasRenderingContext2D;
  #currentStroke: Point[] = [];
  #strokes: Stroke[] = [];
  #_isDrawing = false;

  readonly destroy: () => void;
  get #isDrawing(): boolean {
    return this.#_isDrawing;
  }
  set #isDrawing(isDrawing: boolean) {
    if (this.#destroyed) return;
    if (isDrawing === this.#_isDrawing) return;
    this.#_isDrawing = isDrawing;
    this.#options[isDrawing ? 'onDrawStart' : 'onDrawEnd']?.();
  }

  #options: HandwritingRecognizerCanvasControllerOptions;

  constructor(
    canvas: HTMLCanvasElement,
    options: HandwritingRecognizerCanvasControllerOptions = {},
  ) {
    this.#options = options;
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.#canvasContext = ctx;

    this.#setupCanvas();
    this.destroy = this.#attachEventListeners();
  }

  #setupCanvas() {
    this.#canvasContext.strokeStyle = 'rgba(77, 26, 1, 0.7)';
    this.#canvasContext.lineCap = 'round';
    this.#canvasContext.lineJoin = 'round';
    this.#canvasContext.lineWidth = this.#options.lineWidth ?? DEFAULT_LINE_WIDTH;
    this.clear();
  }

  #attachEventListeners(): () => void {
    const startStroke = this.#startStroke.bind(this);
    const continueStroke = this.#continueStroke.bind(this);
    const endStroke = this.#endStroke.bind(this);
    const handleTouchStart = this.#handleTouchStart.bind(this);
    const handleTouchMove = this.#handleTouchMove.bind(this);
    const handleTouchEnd = this.#handleTouchEnd.bind(this);

    // Mouse events
    this.canvas.addEventListener('mousedown', startStroke);
    this.canvas.addEventListener('mousemove', continueStroke);
    this.canvas.addEventListener('mouseup', endStroke);
    this.canvas.addEventListener('mouseout', endStroke);
    this.canvas.addEventListener('mouseleave', endStroke);

    // Touch events
    this.canvas.addEventListener('touchstart', handleTouchStart);
    this.canvas.addEventListener('touchmove', handleTouchMove);
    this.canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      // Mouse events
      this.canvas.removeEventListener('mousedown', startStroke);
      this.canvas.removeEventListener('mousemove', continueStroke);
      this.canvas.removeEventListener('mouseup', endStroke);
      this.canvas.removeEventListener('mouseout', endStroke);
      this.canvas.removeEventListener('mouseleave', endStroke);

      // Touch events
      this.canvas.removeEventListener('touchstart', handleTouchStart);
      this.canvas.removeEventListener('touchmove', handleTouchMove);
      this.canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }

  #getPointFromEvent({ clientX, clientY }: Pick<MouseEvent, 'clientX' | 'clientY'>): Point {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  #startStroke(e: Pick<MouseEvent, 'clientX' | 'clientY'>) {
    this.#isDrawing = true;
    const point = this.#getPointFromEvent(e);
    this.#currentStroke = [point];
    this.#canvasContext.beginPath();
    this.#canvasContext.moveTo(point.x, point.y);
  }

  #continueStroke(e: Pick<MouseEvent, 'clientX' | 'clientY'>) {
    if (!this.#isDrawing) return;
    const point = this.#getPointFromEvent(e);
    this.#currentStroke.push(point);
    this.#canvasContext.lineTo(point.x, point.y);
    this.#canvasContext.stroke();
  }

  #endStroke() {
    if (!this.#isDrawing) return;
    if (this.#currentStroke.length > 0) {
      this.#strokes.push({ points: [...this.#currentStroke] });
    }
    this.#currentStroke = [];
    this.#isDrawing = false;
  }

  #handleTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const [touch] = e.touches;
    if (touch) {
      this.#startStroke(touch);
    }
  }

  #handleTouchMove(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const [touch] = e.touches;
    if (touch) {
      this.#continueStroke(touch);
    }
  }

  #handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    this.#endStroke();
  }

  clear() {
    this.#canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.#strokes = [];
    this.#currentStroke = [];
    this.#isDrawing = false;
  }

  #formatTracesForAPI(): [number[], number[], number[]][] {
    return this.#strokes.map(stroke => {
      const xPoints = stroke.points.map(p => p.x);
      const yPoints = stroke.points.map(p => p.y);
      return [xPoints, yPoints, []];
    });
  }

  async recognize(options: RecognitionOptions = {}): Promise<string> {
    if (this.#strokes.length === 0) {
      return '';
    }

    const response = await fetch(GOOGLE_HANDWRITING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        options: 'enable_pre_space',
        requests: [
          {
            writing_guide: {
              writing_area_width: options.width || this.canvas.width,
              writing_area_height: options.height || this.canvas.height,
            },
            ink: this.#formatTracesForAPI(),
            language: options.language ?? 'en',
          },
        ],
      }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 403:
          throw new Error('Access denied');
        case 503:
          throw new Error('Cannot connect to recognition server');
        default:
          throw new Error(`HTTP error: ${response.status}`);
      }
    }

    const [statusMessage, result] = (await response.json()) as GoogleHandwritingApiResult;
    if (!result) {
      throw new Error(statusMessage);
    }

    return result[0]?.[1]?.[0] ?? '';
  }
}
