import { useState } from "react";

export function useSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  return { isOpen, onOpen };
}
