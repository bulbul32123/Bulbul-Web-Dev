import React from "react";
import { IoClose } from "react-icons/io5";

const EasterEggLocationsModal = ({ isOpen, locations = [], onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col relative">
        <div className="flex-shrink-0 p-6 pb-4 border-b">
          <button
            className="absolute top-4 right-4 text-black cursor-pointer hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold pr-8">Easter Egg Locations 🗺️</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="space-y-3">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="p-3 border-l-4 border-blue-500 rounded hover:bg-blue-50 transition"
              >
                <h4 className="font-bold">{loc.title}</h4>
                <p className="text-gray-700">{loc.description}</p>
                <p className="italic text-sm text-gray-600 mt-1">💡 {loc.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggLocationsModal;