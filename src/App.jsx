// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SidebarLayout from './components/SidebarLayout';
import { EasterEggProvider } from './context/EasterEggContext';
import { Toaster } from 'react-hot-toast';
import Curve from './components/Curve';
import useLenis from './hooks/useLenis';

function AnimatedRoutes() {
  const location = useLocation();
  useLenis()
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsLoading(true);       // Simulate loading before transition
      const loadingTimeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 400); // Adjust loading delay as needed

      return () => clearTimeout(loadingTimeout);
    }
  }, [location, displayLocation]);

  const onTransitionComplete = () => {
    setDisplayLocation(location); // Actually show new route
    setIsTransitioning(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isTransitioning && displayLocation === null) {
      setDisplayLocation(location); // First load case
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
            <Route path="/aboutMe" element={<About />} />
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
