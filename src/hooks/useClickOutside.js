import { useEffect, useRef } from "react";

export function useClickOutside(ref, targetValue, callback) {
  const callbackRef = useRef(callback);
  const valueRef = useRef(targetValue);

  useEffect(() => {
    callbackRef.current = callback;
    valueRef.current = targetValue;
  }, [callback, targetValue]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (valueRef.current !== null) {
          callbackRef.current(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
