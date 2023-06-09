---
title: "Astro"
description: "Example for Astro"
---

With astro you can use the [React Package](/en/react). But if you only want to use Astro you can use the followin example

## Installation

```bash
npm install searchmate-js
```

## Usage

```astro
<script>
  import { searchmate } from "searchmate-js";
  import "../styles.css";
  import "searchmate-js/css";

  const searchmateButton = document.getElementById("searchmate-button");

  searchmateButton.addEventListener("click", () => {
    searchmate({
      appId: YOUR_APP_ID,
    });
  });
</script>

<style is:global>
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
</style>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro A</h1>
    <button id="searchmate-button">Search</button>
  </body>
</html>

```

## Overriding the default navigation

You can override the default navigation by passing a function to the `overrideNavigateToResult` prop.

```js
searchmate({
    overrideNavigateToResult(path, withCtrl) {
      // your custom navigation logic
      console.log(path, withCtrl);
    },
  });
/>
```


## Props

Here is the list of props you can pass to the `searchmate` function.

| Name      | Type       | Description                                | Optional |
| --------- | ---------- | ------------------------------------------ | -------- |
| appId     | `string`   | Your Searchmate app id                     | `false`  |
| onClose   | `function` | Callback function when the modal is closed | `true`   |
| urlPrefix | `string`   | Url prefix to use for the search results   | `true`   |
| overrideNavigateToResult | (path: string, withCtrl: boolean) => void | Override the navigate to result function | `true`  |
