import { type SearchProps } from "./types";
import { useEffect } from "react";
import { searchmate } from "searchmate-js";
import "searchmate-js/css";

export function Search({ appId, isOpen, urlPrefix, onClose }: SearchProps) {
  useEffect(() => {
    if (isOpen) {
      searchmate({
        appId,
        urlPrefix,
        onClose,
      });
    }
  }, [isOpen, appId, urlPrefix]);

  return null;
}
