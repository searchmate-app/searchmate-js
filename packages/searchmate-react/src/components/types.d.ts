import { type SearchMateProps } from "searchmate-js";

export interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  urlPrefix?: string;
  appId: string;
  overrideNavigateToResult?: (url: string, withCtrl: boolean) => void;
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
