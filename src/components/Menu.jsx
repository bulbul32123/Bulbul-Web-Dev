import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`fixed top-0 right-0 transition-all duration-300 ease-in-out`}>
                <svg className={`h-screen w-[500px] relative transition-all duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 305" style={{ right: "0px", left: "unset", transform: "matrix(-1, 0, 0, -1, 0, 0)" }} fill={isOpen ? "black" : "white"}>
                    <g id="main">
                        <path id="curve" d="M0,-147C76,153 76,153 0,453 Z"></path>
                    </g>
                </svg>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white text-xl font-bold absolute top-[50%] z-20 right-4 cursor-pointer"><GiHamburgerMenu /></button>
            </div>
            <div className="">
                <svg width="1193" height="552" viewBox="0 0 1193 552" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0H1193V552H22C23.0731 551.695 107.5 522.5 62 476.5C6.5943 420.486 16.5 369.5 107.5 290.5C198.5 211.5 48.0001 162 14 113.5C-20.0001 65 22 0 22 0Z" fill="white" />
                </svg>

            </div>
        </>
    );
}
