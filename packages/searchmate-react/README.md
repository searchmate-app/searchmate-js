This package is a React client for [Searchmate](https://searchmate.app).

## Quick start

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
  return (
    <>
      <button onClick={onOpen}>Open search</button>
      <Search appId={YOUR_APP_ID} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
```

Add the needed css variables to your `App.css`

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
  --searchmate-result-bg: #111827;
  --searchmate-result-text-color: #d1d5db;
  --searchmate-selected-bg: #374151;
  --searchmate-selected-border-color: #6b7280;
  --searchmate-selected-color: #f8fafc;
}
```