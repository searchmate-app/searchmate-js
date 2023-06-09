export type SearchMateProps = {
  appId: string;
  onClose?: () => void;
  urlPrefix?: string;
  // a prop to override the default navigation to the result
  overrideNavigateToResult?: (path: string, withCtrl: boolean) => void;
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
