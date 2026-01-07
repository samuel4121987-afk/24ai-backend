import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      }>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;