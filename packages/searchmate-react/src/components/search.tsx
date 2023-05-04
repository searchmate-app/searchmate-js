import { useEffect } from "react";
import { searchmate, SearchMateProps } from "searchmate-js";

interface SearchProps extends SearchMateProps {
  isOpen: boolean;
}

export function Search({ appId, isOpen, urlPrefix }: SearchProps) {
  useEffect(() => {
    if (isOpen) {
      searchmate({
        appId,
        urlPrefix,
      });
    }
  }, [isOpen, appId, urlPrefix]);

  return null;
}
