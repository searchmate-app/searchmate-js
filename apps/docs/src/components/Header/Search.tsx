/** @jsxImportSource react */
import "./Search.css";
// import { useSearch, Search, useShortcut } from "searchmate-react";
import { Search } from '@searchmate/react'
import "@searchmate/react/css";
import { useEffect, useState } from "react";

export default function SearchComponent() {
  const [open, setOpen] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <button type="button" className="search-input" onClick={() => setOpen(true)}>
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

          <kbd>cmd + k</kbd>

          <span className="sr-only"> to search</span>
        </span>
      </button>
      <Search appId={"e3220f55-0a65-4d57-a067-b42a79101291"} isOpen={open} onOpenChange={setOpen} onResultSelect={(url) => {
        const anchor = document.createElement("a")
        anchor.href = url;
        anchor.click()
        // window.location.pathname = url
      }} />
    </>
  );
}
