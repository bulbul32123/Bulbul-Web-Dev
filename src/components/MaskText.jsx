'use client'
import { useContextApi } from "@/context/ContextApi";
import { useRef, useEffect } from "react";
//Hello but not working

export default function MaskText({ visibleText, secretText, none }) {
    const { setHoveredText } = useContextApi();
    const spanRef = useRef();

    useEffect(() => {
        const rect = spanRef.current?.getBoundingClientRect();
        if (rect) {
            spanRef.current.dataset.x = rect.left;
            spanRef.current.dataset.y = rect.top;
            spanRef.current.dataset.width = rect.width;
            spanRef.current.dataset.height = rect.height;
        }
    }, []);

    return (
        <div
            ref={spanRef}
            className="relative z-10 inline-block"
            onMouseEnter={() => setHoveredText({ text: secretText, ref: spanRef, none: none })}
            onMouseLeave={() => setHoveredText(null)}
        >
                {visibleText} 
        </div>
    );
}
// visiable Text are not working