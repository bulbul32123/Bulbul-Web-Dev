import { useEffect } from "react";

export const useLockBodyScroll = (isLocked) => {
    useEffect(() => {
        if (!isLocked) return;

        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.overflow = "hidden";
        document.body.dataset.scrollY = scrollY;

        return () => {
            const scrollY = document.body.dataset.scrollY;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            window.scrollTo(0, parseInt(scrollY || "0"));
        };
    }, [isLocked]);
};
