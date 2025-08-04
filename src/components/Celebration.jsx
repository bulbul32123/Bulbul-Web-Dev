import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Celebration({ show}) {

    if (!show) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
                <div className="flex items-center justify-center w-full h-full">
                    <Player
                        autoplay
                        controls={false}
                        loop={false}
                        src="/celevration.json"
                        style={{ height: '140vh', width: "100%" }}
                    />
                </div>
        </div>
    );
}
