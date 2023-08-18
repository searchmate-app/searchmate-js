export interface SearchMateProps {
    appId: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onResultSelect: (url: string) => void;
}

export type ResultType = {
    path: string;
    content: {
        type: string;
        content: string;
        headingId?: string;
        depth?: string;
        tempId: string;
    }[];
    tempId: string;
};

export interface SearchItemProps {
    data: ResultType;
    query: string;
    onSelect: (value: string) => void;
}

export interface UseSearchProps {
    appId: string
}

export interface UseSearchReturn {
    results: ResultType[],
    isLoading: boolean;
    onSearchChange: (value: string) => void;
    debouncedQuery: string;
    query: string;
    queryNotFound: boolean,
    emptyQuery: boolean
}

export declare const Search: React.FC<SearchProps>;
export declare const useSearch: (props: UseSearchProps) => UseSearchReturn;