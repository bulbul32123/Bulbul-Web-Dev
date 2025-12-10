import React from "react";
import { useSoundSystem } from "../context/SoundContext";

export default function SoundModal() {
  const { audioUnlocked, enableSound } = useSoundSystem();

  if (audioUnlocked) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
          Enable Sound?
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This portfolio uses subtle sound effects for a better experience.
          Click below to enable audio.
        </p>

        <button
          onClick={enableSound}
          className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Enable Sound
        </button>
      </div>
    </div>
  );
}
