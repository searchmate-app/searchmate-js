import {
    FrameIcon,
} from "@radix-ui/react-icons";
import { Command } from "cmdk";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "./use-search";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";


interface Props {
    appId: string;
}

type ResultType = {
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

interface SearchItemProps {
    data: ResultType;
    query: string;
}

function SearchItem({ data, query }: SearchItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length > 0) {
            if (containerRef.current) {
                const els =
                    containerRef.current.getElementsByClassName("search-result-text");
                for (const el of els) {
                    const text = el.innerHTML;
                    const re = new RegExp(query, "gi"); // "i" flag makes the regex case-insensitive
                    const newText = text.replace(re, (match) => `<mark>${match}</mark>`); // Use the matched text
                    el.innerHTML = newText;
                }
            }
        }
    }, [data, containerRef.current]);

    if (data.content.length <= 0) {
        return (
            <Command.Item
                // className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-2 py-1.5"
                ref={containerRef}
                value={data.tempId}
                key={data.tempId}
            >
                <p className="search-result-text">{data.path}</p>
            </Command.Item>
        );
    }

    return (
        <div className="w-full" ref={containerRef}>
            <p cmdk-path="" className="search-result-text">
                {data.path}
            </p>
            {data.content.map((itemContent) => {
                if (itemContent.type === "heading") {
                    return (
                        <Command.Item
                            // className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-2 py-1.5 ml-5"
                            value={itemContent.tempId}
                            key={itemContent.tempId}
                        >
                            <FrameIcon />{" "}
                            <span className="search-result-text">{itemContent.content}</span>
                        </Command.Item>
                    );
                }
                if (itemContent.type === "paragraph") {
                    return (
                        <Command.Item
                            // className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-2 py-1.5"
                            value={itemContent.tempId}
                            key={itemContent.tempId}
                        >
                            <span className="search-result-text">{itemContent.content}</span>
                        </Command.Item>
                    );
                }
            })}
        </div>
    );
}

export function Search({ appId }: Props) {
    const [open, setOpen] = useState(false)

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const { onSearchChange, query, results } = useSearch({ appId });

    // const notFound = results.length <= 0 && query.length > 0;
    // const noQuery = results.length <= 0 && query.length <= 0;

    return (
        <Dialog open={open}
            onOpenChange={setOpen}>
            <DialogPortal>
                <DialogOverlay className="sm-dialog-overlay" />
                <DialogContent className="sm-dialog-content" >
                    <Command
                        // className="w-full bg-background rounded-lg shadow-xl border border-border"
                        className="sm-search"
                        shouldFilter={false}
                        loop
                    >
                        <Command.Input placeholder="react" onValueChange={onSearchChange} value={query} />
                        <Command.List className="p-4 min-h-[300px] max-h-[300px] overflow-y-auto overflow-x-hidden">
                            {/* {notFound && (
                                <Command.Empty className="py-6 text-center text-muted-foreground text-sm flex flex-col items-center">
                                    <CrossCircledIcon className="w-6 h-6 mb-2" />
                                    <p>No results found.</p>
                                </Command.Empty>
                            )}
                            {noQuery && (
                                <Command.Empty className="py-6 text-center text-muted-foreground text-sm flex flex-col items-center">
                                    <MagnifyingGlassIcon className="w-6 h-6 mb-2" />
                                    Type your query...
                                </Command.Empty>
                            )} */}
                            {results.map((result: ResultType) => (
                                <SearchItem query={query} key={result.tempId} data={result} />
                            ))}
                        </Command.List>
                    </Command>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}