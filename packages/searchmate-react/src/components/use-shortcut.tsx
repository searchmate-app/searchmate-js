import { useShortcutProps } from "./types";
import { useEffect } from "react";

export function useShortcut({
  callback,
  key,
  withCtrl = false,
}: useShortcutProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        if (withCtrl) {
          event.preventDefault();
          if (event.ctrlKey) {
            callback();
          }
        } else {
          event.preventDefault();
          callback();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, key, withCtrl]);
}
