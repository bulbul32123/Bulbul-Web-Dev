import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import Home from './pages/Home';
import Curve from './components/Curve';
import SidebarLayout from './components/SidebarLayout';
import { EasterEggProvider } from './context/EasterEggContext';
import { SoundProvider } from './context/SoundContext';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function AnimatedRoutes() {
  const location = useLocation();
  useLenis();

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
    <div className="2xl:max-w-[1300px] mx-auto h-full w-full">
      {(isTransitioning || isLoading) && <Curve onComplete={onTransitionComplete} />}
      {!isTransitioning && !isLoading && (
        <SidebarLayout>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
          </Routes>
        </SidebarLayout>
      )}
    </div>
  );
}

// Loading screen with avatar skeleton
function LoadingScreen({ onStart }) {
  const STATE_MACHINE_NAME = "State Machine 1";
  const { RiveComponent, rive } = useRive({
    src: "/models/avatar.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const pokeLeft = useStateMachineInput(rive, STATE_MACHINE_NAME, "poked left eye");

  useEffect(() => {
    if (!pokeLeft) return;

    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const handleMouseEnter = () => (pokeLeft.value = true);
    const handleMouseLeave = () => (pokeLeft.value = false);

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pokeLeft]);

  const [progress, setProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // Increment progress gradually
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5;
        if (next >= 100) {
          clearInterval(interval);
          setProgressComplete(true);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Detect Rive component mount as "avatar loaded"
  useEffect(() => {
    if (progressComplete) {
      const timeout = setTimeout(() => setAvatarLoaded(true), 500); // slight delay for smooth transition
      return () => clearTimeout(timeout);
    }
  }, [progressComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      {/* Progress circle */}
      {!progressComplete && (
        <div className="relative w-60 h-60">
          <svg className="w-60 h-60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeDasharray={Math.PI * 2 * 45}
              strokeDashoffset={Math.PI * 2 * 45 * (1 - progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-7xl textFontFamily">
            {Math.floor(progress)}%
          </div>
        </div>
      )}

      {/* Avatar skeleton + Start button */}
      {progressComplete && !avatarLoaded && (
        <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse mb-5" />
      )}

      {avatarLoaded && (
        <>
          <div className="w-[200px] h-[200px]">
            <RiveComponent />
          </div>
          <button
            onClick={onStart}
            className="mt-5 px-20 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
          >
            Start
          </button>
        </>
      )}
    </div>
  );
}

// Root wrapper
function RootApp() {
  const [started, setStarted] = useState(false);
  const handleStart = () => setStarted(true);

  return (
    <>
      {!started && <LoadingScreen onStart={handleStart} />}
      {started && (
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </>
  );
}

const App = () => {
  return (
    <EasterEggProvider>
      <SoundProvider>
        <Toaster position="top-right" />
        <RootApp />
      </SoundProvider>
    </EasterEggProvider>
  );
};

export default App;
