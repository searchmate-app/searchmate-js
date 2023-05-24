export const SITE = {
  title: "Docs",
  description: "The oficial documentation for Search Mate client packages",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "/default-og-image.png",
    alt: "Search Mate Logo Banner",
  },
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/searchmate/searchmate-js`;

// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    "General": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Vanilla JS", link: "en/vanilla-js" },
      { text: "React", link: "en/react" },
      { text: "Astro", link: "en/astro" },
    ],
  },
};

export const SEARCHMATE_APP_ID = import.meta.env.PUBLIC_SEARCHMATE_APP_ID