import { type SearchMateProps } from "searchmate-js";

export interface SearchProps extends SearchMateProps {
  isOpen: boolean;
}

interface useSearchReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface useShortcutProps {
  key: string;
  isOpen: boolean;
  withCtrl?: boolean;
  callback: () => void;
}

export declare const Search: React.FC<SearchProps>;
export declare const useSearch: () => useSearchReturn;
export declare const useShortcut: (props: useShortcutProps) => void;
