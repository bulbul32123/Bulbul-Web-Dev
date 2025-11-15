import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const EasterEggCheatModal = ({ isOpen, onClose, onUnlock }) => {
  const [showCheatCodes, setShowCheatCodes] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowCheatCodes(false);
    }
  }, [isOpen]);

  const cheatCodes = [
    { id: 1, title: "The Name Game", description: "Click Bulbul 5 times.", hint: "Top left corner" },
    { id: 2, title: "Theme Hunter", description: "Click theme modal 5 times.", hint: "Theme switcher" },
    { id: 3, title: "Interface Master", description: "Click 'Interfaces'.", hint: "Hero glow" },
    { id: 4, title: "Resume Secret", description: "Click '--' in hero.", hint: "The dash" },
    { id: 5, title: "Music Lover", description: "Click the music icon.", hint: "Melody" },
    { id: 6, title: "Avatar Expansion", description: "Click avatar.", hint: "Profile picture" },
    { id: 7, title: "Game Master", description: "Beat the game.", hint: "Skill time" },
    { id: 8, title: "Hidden Star", description: "Find the star in menu.", hint: "You found it" },
  ];

  const handleUnlock = () => {
    setShowCheatCodes(true);
    onUnlock?.(); 
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-x-hidden bg-white">
        <button className="text-xl bg-red-400 p-3 rounded-md absolute text-black top-4 right-4 cursor-pointer" onClick={() => onClose(false)}><IoClose
          size={15} /></button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-black font-bold">
            You Found the Cheat Codes
          </AlertDialogTitle>

          <AlertDialogDescription className="text-black text-lg">
            {!showCheatCodes ? (
              <div>
                <p className="text-gray-700">
                  Congratulations! You've discovered the secret Easter egg menu!
                  There are{" "}
                  <span className="font-bold">8 hidden Easter eggs</span>{" "}
                  scattered throughout my portfolio.
                </p>
                <p className="text-gray-600 mt-2">
                  Would you like to unlock all the cheat codes or continue
                  hunting by yourself?
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-6 h-[40rem]">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">🗺️ Easter Egg Locations:</h3>

                  <div className="space-y-4">
                    {cheatCodes.map(code => (
                      <div key={code.id} className="border-l-4 pl-4 py-2 hover:bg-purple-50 transition-colors">

                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                            {code.id}
                          </span>

                          <div>
                            <h4 className="font-bold text-gray-800">{code.title}</h4>
                            <p className="text-gray-600 text-sm">{code.description}</p>
                            <p className="text-xs italic mt-1">💡 {code.hint}</p>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <b>Pro Tip:</b> Some eggs unlock animations 🎯
                  </p>
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!showCheatCodes ? (
          <AlertDialogFooter className="flex gap-3 mt-6">
            <AlertDialogCancel
              onClick={() => { setShowCheatCodes(false); onClose?.(); }}
              className="!bg-lime-400 cursor-pointer hover:!bg-lime-400/80 hover:!text-black text-black px-8 !py-6 rounded-md"
            >
              I'll Find Them Myself 🕵️
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleUnlock}
              className="bg-black text-white cursor-pointer hover:bg-black/80 px-8 !py-6 rounded-md"
            >
              Unlock Cheat Codes 🔓
            </AlertDialogAction>
          </AlertDialogFooter>
        )


          : (
            <AlertDialogFooter className="mt-6">
              <AlertDialogAction
                onClick={onClose}
                className="w-full bg-black text-white py-6 rounded-md"
              >
                Start Hunting! 🎯
              </AlertDialogAction>
            </AlertDialogFooter>
          )}

      </AlertDialogContent>
    </AlertDialog >
  );
};

export default EasterEggCheatModal;

