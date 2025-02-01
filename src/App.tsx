import { OCRCanvasWithTimeout } from './components/OCRCanvasWithTimeout';
import { VintagePaper } from './components/VintagePaper';

function App() {
  return (
    <div className="mx-auto flex min-h-lvh max-w-6xl flex-col items-center justify-center p-4">
      <VintagePaper className="max-h-[calc(1.4141*(100vw-2rem))] grow">
        <OCRCanvasWithTimeout timeout={1500} onRecognized={text => console.log(text)} />
      </VintagePaper>
    </div>
  );
}

export default App;
