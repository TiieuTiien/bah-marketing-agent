import { type RefObject, useEffect } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    addEventListener: boolean = true    
) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        if (addEventListener) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [ref, callback, addEventListener])
}