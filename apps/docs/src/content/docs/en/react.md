---
title: "React"
description: "Integrate Search Mate in your REACT app"
---

This package is a react client for [Searchmate](https://searchmate.app).

## Quick Start

```bash
npm i searchamte-react
```

Once is installed you can use the package now you can import it in your code like this

```tsx
import "./App.css";
import { Search, useSearch } from "searchmate-react";
import "searchmate-react/css";

function App() {
  const { isOpen, onOpen, onClose } = useSearch();
  useShortcut({
    callback: onOpen,
    isOpen,
    key: "k",
    withCtrl: true,
  });
  useShortcut({
    callback: onOpen,
    isOpen,
    key: "/",
  });

  return (
    <>
      <button onClick={onOpen}>Open search</button>
      <Search appId={YOUR_APP_ID} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
```

### CSS variables

Add the needed css variables to your `App.css`

Feel free to change the values to match your theme.

```css
:root {
  /* Searchmate */
  /* container */
  --searchmate-container-color: rgba(15, 23, 42, 0.1);
  --searchmate-search-color: #fff;

  /* input */
  --searchmate-input-bg-color: #fff;
  --searchmate-input-border-color: #f4f4f5;
  --searchmate-input-text-color: #3f3f46;
  --searchmate-search-icon-color: #d4d4d8;
  --searchmate-input-placeholder-color: #d4d4d8;

  /* results */
  --searchmate-result-text-color: #3f3f46;
  --searchmate-result-bg: #fafafa;
  --searchmate-selected-bg: #ef4444;
  --searchmate-selected-border-color: #f87171;
  --searchmate-selected-color: #f8fafc;

  /* footer */
  --searchmate-footer-text-color: #3f3f46;
}
```

### Dark mode

To add dark mode append the dark variables to your `App.css`

```css
:root.your-theme-dark-class {
  color-scheme: dark;

  /* Searchmate */
  /* container */
  --searchmate-container-color: rgba(15, 23, 42, 0.1);
  --searchmate-search-color: #030712;

  /* input */
  --searchmate-input-border-color: #1f2937;
  --searchmate-input-bg-color: #030712;
  --searchmate-input-text-color: #d1d5db;
  --searchmate-input-placeholder-color: #4b5563;
  --searchmate-search-icon-color: #6b7280;

  /* results */
  --searchmate-result-bg: #0f172a;
  --searchmate-result-text-color: #d1d5db;
  --searchmate-selected-bg: #ef4444;
  --searchmate-selected-border-color: #ef4444;
  --searchmate-selected-color: #f8fafc;

  /* footer */
  --searchmate-footer-text-color: #d1d5db;
}
```

## Overriding default navigation

You can override the default navigation by passing a function to the `overrideNavigateToResult` prop.

```tsx
<Search
  overrideNavigateToResult={(path, withCtrl) => {
    // your custom navigation logic
    console.log(path, withCtrl);
  }}
/>
```

## Props

Here you can find the props for the components and hooks.

### Search

| Name      | Type       | Description                                | Optional |
| --------- | ---------- | ------------------------------------------ | -------- |
| isOpen    | boolean    | If the search is open                      | false    |
| onClose   | () => void | Callback to call when the search is closed | false    |
| urlPrefix | string     | Url prefix to use for the links            | true     |
| appId     | string     | App id to use for the search               | false    |
| overrideNavigateToResult | (path: string, withCtrl: boolean) => void | Override the default navigation | true |

### useShortcut

| Name     | Type       | Description                                     | Optional |
| -------- | ---------- | ----------------------------------------------- | -------- |
| key      | string     | Key to trigger the shortcut                     | false    |
| isOpen   | boolean    | If the search is open                           | false    |
| withCtrl | boolean    | If the shortcut needs to be pressed with ctrl   | true     |
| callback | () => void | Callback to call when the shortcut is triggered | false    |
