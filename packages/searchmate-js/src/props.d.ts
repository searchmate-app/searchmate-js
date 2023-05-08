export type SearchMateProps = {
  appId: string;
  onClose?: () => void;
  urlPrefix?: string;
  theme?: "light" | "dark";
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
