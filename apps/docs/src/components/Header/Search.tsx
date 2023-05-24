/** @jsxImportSource react */
import "./Search.css";
import { useSearch, Search, useShortcut } from "searchmate-react";
import "searchmate-react/css";
import { SEARCHMATE_APP_ID } from "../../consts";

export default function SearchComponent() {
  const { isOpen, onClose, onOpen } = useSearch();
  useShortcut({
    callback: onOpen,
    isOpen,
    key: "/",
  });

  useShortcut({
    callback: onOpen,
    isOpen,
    key: "k",
    withCtrl: true,
  });

  return (
    <>
      <button type="button" className="search-input">
        <svg width="24" height="24" fill="none">
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Search</span>

        <span className="search-hint">
          <span className="sr-only">Press </span>

          <kbd>/</kbd>

          <span className="sr-only"> to search</span>
        </span>
      </button>
      <Search appId={SEARCHMATE_APP_ID} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
