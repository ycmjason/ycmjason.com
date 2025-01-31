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

export type HandwritingRecognizerConstructorOptions = {
  lineWidth?: number;
};

export class HandwritingRecognizer {
  #canvas: HTMLCanvasElement;
  #canvasContext: CanvasRenderingContext2D;
  #currentStroke: Point[] = [];
  #strokes: Stroke[] = [];
  #isDrawing = false;

  constructor(
    canvas: HTMLCanvasElement,
    { lineWidth = 3 }: HandwritingRecognizerConstructorOptions = {},
  ) {
    this.#canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.#canvasContext = ctx;

    this.#setupCanvas({ lineWidth });
    this.#attachEventListeners();
  }

  #setupCanvas({ lineWidth }: { lineWidth: number }) {
    this.#canvasContext.strokeStyle = 'black';
    this.#canvasContext.lineCap = 'round';
    this.#canvasContext.lineJoin = 'round';
    this.#canvasContext.lineWidth = lineWidth;
  }

  #attachEventListeners() {
    // Mouse events
    this.#canvas.addEventListener('mousedown', this.#startStroke.bind(this));
    this.#canvas.addEventListener('mousemove', this.#continueStroke.bind(this));
    this.#canvas.addEventListener('mouseup', this.#endStroke.bind(this));
    this.#canvas.addEventListener('mouseout', this.#endStroke.bind(this));
    this.#canvas.addEventListener('mouseleave', this.#endStroke.bind(this));

    // Touch events
    this.#canvas.addEventListener('touchstart', this.#handleTouchStart.bind(this));
    this.#canvas.addEventListener('touchmove', this.#handleTouchMove.bind(this));
    this.#canvas.addEventListener('touchend', this.#handleTouchEnd.bind(this));
  }

  #getPointFromEvent({ clientX, clientY }: Pick<MouseEvent, 'clientX' | 'clientY'>): Point {
    const rect = this.#canvas.getBoundingClientRect();
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
    this.#isDrawing = false;
    if (this.#currentStroke.length > 0) {
      this.#strokes.push({ points: [...this.#currentStroke] });
    }
    this.#currentStroke = [];
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
    this.#canvasContext.fillStyle = 'white';
    this.#canvasContext.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
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

  async recognize(options: RecognitionOptions = {}): Promise<string[]> {
    if (this.#strokes.length === 0) {
      throw new Error('No handwriting to recognize');
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
              writing_area_width: options.width || this.#canvas.width,
              writing_area_height: options.height || this.#canvas.height,
            },
            ink: this.#formatTracesForAPI(),
            language: options.language || 'zh_TW',
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

    return result[0]?.[1] ?? [];
  }
}
