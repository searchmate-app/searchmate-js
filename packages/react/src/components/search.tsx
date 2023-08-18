import {
  CrossCircledIcon,
  FrameIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Command } from "cmdk";
import { useEffect, useRef } from "react";
import { useSearch } from "./use-search";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { ResultType, SearchItemProps, SearchMateProps } from "./types";


function SearchItem({ data, query, onSelect }: SearchItemProps) {
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
        onSelect={() => onSelect(`/${data.path}`)}
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
              onSelect={() => onSelect(`/${data.path}#${itemContent.headingId}`)}
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
              onSelect={() => onSelect(`/${data.path}`)}
            >
              <span className="search-result-text">{itemContent.content}</span>
            </Command.Item>
          );
        }
      })}
    </div>
  );
}

export function Search({ appId, isOpen, onOpenChange, onResultSelect }: SearchMateProps) {
  const { onSearchChange, query, results, queryNotFound, emptyQuery } = useSearch({ appId });



  return (
    <Dialog open={isOpen}
      onOpenChange={onOpenChange}>
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
            <Command.List>
              {queryNotFound && (
                <Command.Empty className="py-6 text-center text-muted-foreground text-sm flex flex-col items-center">
                  <CrossCircledIcon />
                  <p>No results found.</p>
                </Command.Empty>
              )}
              {emptyQuery && (
                <Command.Empty className="py-6 text-center text-muted-foreground text-sm flex flex-col items-center">
                  <MagnifyingGlassIcon />
                  Type your query...
                </Command.Empty>
              )}
              {results.map((result: ResultType) => (
                <SearchItem onSelect={onResultSelect} query={query} key={result.tempId} data={result} />
              ))}
            </Command.List>
            <div cmdk-footer="">
              <span >
                Go to
                <kbd>↵</kbd>
              </span>
            </div>
          </Command>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
