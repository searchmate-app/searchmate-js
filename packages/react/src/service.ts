type SearchDocsArgs = {
    appId: string;
    query: string;
}

export async function searchDocs({ query, appId }: SearchDocsArgs) {
    try {
        const url = new URL("https://search-worker.searchmateapp.workers.dev/v2");
        url.searchParams.append("query", query);
        url.searchParams.append("appId", appId);
        const res = await fetch(url.toString());
        const data = await res.json();
        if (!res.ok) {
            return { data: null, statusText: data?.error, error: res.status };
        }
        return { data, statusText: res.statusText, error: null };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            statusText: "Server internal error",
            error: "Something went wrong",
        };
    }
}