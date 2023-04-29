export type SearchMateProps = {
  container: string;
  appId: string;
};

type DocContent = {
  type: string;
  content: string;
  depth?: number;
};

type Result = {
  id: string;
  path: string;
  content: DocContent[];
};
