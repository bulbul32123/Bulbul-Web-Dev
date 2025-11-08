import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Curve from './components/Curve';
import SidebarLayout from './components/SidebarLayout';
import { EasterEggProvider } from './context/EasterEggContext';
function AnimatedRoutes() {
  const location = useLocation();
  useLenis()
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsLoading(true);
      const loadingTimeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 400);

      return () => clearTimeout(loadingTimeout);
    }
  }, [location, displayLocation]);

  const onTransitionComplete = () => {
    setDisplayLocation(location);
    setIsTransitioning(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isTransitioning && displayLocation === null) {
      setDisplayLocation(location);
      setIsLoading(false);
    }
  }, [displayLocation, isTransitioning, location]);

  return (
    <div className='2xl:max-w-[1300px] mx-auto h-full w-full'>
      {(isTransitioning || isLoading) && <Curve onComplete={onTransitionComplete} />}
      {!isTransitioning && !isLoading && (
        <SidebarLayout>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
          </Routes>
        </SidebarLayout>
      )}
    </div>
  );
}

const App = () => {
  return (
    <EasterEggProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </EasterEggProvider>
  );
};

export default App;

