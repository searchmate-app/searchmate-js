import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { searchDocs } from "../service";
import { UseSearchProps } from "./types";


export const useSearch = ({ appId }: UseSearchProps) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const debouncedQuery = useDebounce(query, 250);

    const onSearchChange = (value: string) => {
        setQuery(value);
    };

    const fetchResults = async () => {
        setIsLoading(true);
        const { data, error, statusText } = await searchDocs({
            query: debouncedQuery,
            appId,
        });
        setIsLoading(false);
        if (error) {
            return { results: null, errors: [{ error: statusText }] };
        }

        return { results: data.results, errors: [] };
    };

    useEffect(() => {
        if (query.length > 0) {
            fetchResults().then((res) => {
                if (res.results) {
                    setResults(res.results);
                }
            });
        }
    }, [debouncedQuery]);

    const queryNotFound = results.length <= 0 && debouncedQuery.length > 0 && !isLoading;
    const emptyQuery = results.length <= 0 && query.length <= 0;

    return {
        results,
        isLoading,
        onSearchChange,
        debouncedQuery,
        query,
        queryNotFound, emptyQuery
    };
};