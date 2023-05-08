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
  --searchmate-input-text-color: #3f3f46;
  --searchmate-input-color: #f1f5f9;
  --searchmate-result-color: #64748b;
  --searchmate-result-bg: #f8fafc;
  --searchmate-search-color: #fff;
  --searchmate-container-color: rgba(15, 23, 42, 0.1);
  --searchmate-search-icon-color: #334155;
  --searchmate-input-placeholder-color: #cbd5e1;
  --searchmate-selected-bg: #fee2e260;
  --searchmate-selected-border-color: #fecaca60;
  --searchmate-link-colors: #ef4444;
  --searchmate-path-body-color: #737373;
}
```

### Dark mode

To add dark mode append the dark variables to your `App.css`

```css
:root.your-theme-dark-class {
  color-scheme: dark;
  --searchmate-input-text-color: #f4f4f5;
  --searchmate-input-color: #27272a;
  --searchmate-result-color: #fafafa;
  --searchmate-result-bg: #171717;
  --searchmate-search-color: #27272a;
  --searchmate-container-color: rgba(15, 23, 42, 0.1);
  --searchmate-search-icon-color: #d4d4d8;
  --searchmate-selected-bg: #fee2e220;
  --searchmate-input-placeholder-color: #737373;
  --searchmate-selected-border-color: #fecaca;
  --searchmate-link-colors: #ef4444;
  --searchmate-path-body-color: #a3a3a3;
}
```
