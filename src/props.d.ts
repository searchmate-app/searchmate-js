export type SearchMateProps = {
  container: string;
  appId: string;
  urlPrefix?: string;
};

type DocContent = {
  type: string;
  content: string;
  depth?: number;
  headingId?: string;
};

type Result = {
  id: string;
  path: string;
  content: DocContent[];
};
