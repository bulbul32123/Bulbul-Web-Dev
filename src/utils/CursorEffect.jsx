import { motion } from 'framer-motion';
import useMousePosition from './useMousePosition';
import { useContextApi } from '@/context/ContextApi';

function isPointerTarget(el) {
    const tag = el?.tagName?.toLowerCase();
    return ['a', 'button', 'input', 'textarea', 'select', 'label'].includes(tag);
}


export default function CursorEffect() {
    const { x, y, hoveredElement } = useMousePosition();
    const { hoveredText } = useContextApi();

    const showCursor = !isPointerTarget(hoveredElement);
    const size = hoveredText
        ? hoveredText.none
            ? 30 
            : 300 
        : 40;  


    const ref = hoveredText?.ref?.current;
    const text = hoveredText?.text || '';
    const rect = ref?.getBoundingClientRect();

    const textX = rect?.left ?? 0;
    const textY = rect?.top ?? 0;

    return (
        <div className="cursorDiv pointer-events-none fixed inset-0 z-50">
            <motion.div
                className="mask"
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px ${size}px`,
                    maskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    maskSize: `${size}px ${size}px`,
                    opacity: showCursor ? 1 : 0, 
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.4 }}
            >

                <div
                    className="body w-full inline"
                    style={{
                        position: 'absolute',
                        top: textY,
                        left: textX,

                    }}
                >
                    {text}
                </div>
            </motion.div>
        </div>
    );
}
