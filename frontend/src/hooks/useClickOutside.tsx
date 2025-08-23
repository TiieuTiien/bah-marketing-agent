import { type RefObject, useEffect } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    addEventListener: boolean = true    
) => {
    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    }

    useEffect(() => {
        if (addEventListener) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [ref, callback, addEventListener])
}