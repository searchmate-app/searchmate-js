---
title: "useSearch"
description: "Create you own search"
---

If you want to create your own search ui. You can import `useSearch` to only use the api.

## Quick start

```bash
npm i @searchmate/react
```

Once is installed you can use the package now you can import it in your code like this

```tsx
import { useSearch } from '@searchmate/react'

export default function SearchComponent() {
  const { debouncedQuery, emptyQuery, isLoading, onSearchChange, query, queryNotFound, results } = useSearch({ appId: YOUR_APP_ID })

  return (
    <>
    {/* ... */}
    <input value={query} onChange={onSearchChange} />
    {/* ... */}
    </>
  );
}

```


## Props

Here you can find the props.

### Search

| Name         | Type                  | Description                         | Optional |
| ------------ | --------------------- | ----------------------------------- | -------- |
| appId        | string                | App id to use for the search        | false    |
