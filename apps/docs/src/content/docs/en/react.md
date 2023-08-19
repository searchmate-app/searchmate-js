---
title: "React"
description: "Integrate Search Mate in your REACT app"
---

This package is a React client for [Searchmate](https://searchmate.app).

## Quick start

```bash
npm i @searchmate/react
```

Once is installed you can use the package now you can import it in your code like this

```tsx
import "./Search.css";
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

```

Add the `css variables` needed

If you modify the variables make sure that you put the values in `hsl` like the default.

```css
/* globals.css */
:root {
  --sm-background: 0 0% 100%;
  --sm-foreground: 0 0% 3.9%;

  --sm-primary: 0 0% 9%;
  --sm-primary-foreground: 0 0% 98%;

  --sm-secondary: 0 0% 96.1%;
  --sm-secondary-foreground: 0 0% 9%;

  --sm-muted: 0 0% 96.1%;
  --sm-muted-foreground: 0 0% 45.1%;

  --sm-border: 0 0% 89.8%;
  --sm-accent: 262.1 83.3% 57.8%;

  --sm-radius: 0.5rem;

  --dialog-shadow: 0 16px 70px rgb(0 0 0 / 20%);
}

:root.your-dark-theme-class {
  --sm-background: 0 0% 3.9%;
  --sm-foreground: 0 0% 98%;

  --sm-primary: 0 0% 98%;
  --sm-primary-foreground: 0 0% 9%;

  --sm-secondary: 0 0% 14.9%;
  --sm-secondary-foreground: 0 0% 98%;

  --sm-muted: 0 0% 14.9%;
  --sm-muted-foreground: 0 0% 63.9%;

  --sm-border: 0 0% 14.9%;
  --sm-accent: 262.1 83.3% 57.8%;
}
```

## Props

Here you can find the props for the components and hooks.

### Search

| Name      | Type       | Description                                | Optional |
| --------- | ---------- | ------------------------------------------ | -------- |
| isOpen    | boolean    | If the search is open                      | false    |
| onOpenChange   | () => void | Callback to call when isOpen change | false    |
| appId     | string     | App id to use for the search               | false    |
| onResult | (url: string) => void | Callback when a result is selected | false |
