import React, { useRef } from "react";
import "./TagInput.css";
import { normalizeTags } from "./tags.js";

export const TagInput = ({ tags, onChange, draft, onDraftChange }) => {
  const inputRef = useRef(null);

  function addTags() {
    onChange(normalizeTags([...tags, draft]));
    onDraftChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="tag-editor">
      {tags.map((tag) => (
        <div className="tag-editor-item" key={tag}>
          <span>{tag}</span>
          <button
            type="button"
            className="tag-editor-remove destructive"
            aria-label={`Remove tag ${tag}`}
            title={`Remove tag ${tag}`}
            onClick={() => onChange(tags.filter((value) => value !== tag))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z" />
            </svg>
          </button>
        </div>
      ))}
      <div className="tag-editor-entry">
        <input
          ref={inputRef}
          type="text"
          aria-label="New tags"
          placeholder="tag1, tag2"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Enter") {
              event.preventDefault();
              event.stopPropagation();
              addTags();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              onDraftChange("");
            }
          }}
        />
        <button
          type="button"
          className="tag-editor-control"
          onClick={addTags}
          aria-label="Confirm tags"
          title="Confirm tags"
        >
          ✓
        </button>
      </div>
    </div>
  );
};
