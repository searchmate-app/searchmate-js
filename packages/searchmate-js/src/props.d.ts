export type SearchMateProps = {
  appId: string;
  urlPrefix?: string;
};

export declare function searchmate({ appId, urlPrefix }: SearchMateProps): void;

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
