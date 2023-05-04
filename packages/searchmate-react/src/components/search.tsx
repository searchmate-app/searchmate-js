import { useEffect } from "react";
import { type SearchMateProps, searchmate } from "searchmate-js";

interface SearchProps extends SearchMateProps {
  isOpen: boolean;
}

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
