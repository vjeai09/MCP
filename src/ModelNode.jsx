import React from "react";
import { Handle, Position } from "reactflow";

export default function ModelNode({ id, data, type, onPromptChange, onDelete }) {
  const isPrompt = type === "prompt";

  const handleCopy = () => {
    if (data.response) {
      navigator.clipboard.writeText(data.response);
      alert("Response copied to clipboard!");
    }
  };

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
        background: isPrompt ? "#f9f9f9" : "#e8f0fe",
        minWidth: 250,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isPrompt ? (
        <>
          <textarea
            rows={5}
            value={data.prompt}
            onChange={(e) => onPromptChange(id, e.target.value, data.model)}
            placeholder="Enter your prompt here..."
            style={{
              width: "100%",
              padding: 8,
              fontSize: 14,
              borderRadius: 4,
              border: "1px solid #bbb",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <select
            value={data.model}
            onChange={(e) => onPromptChange(id, data.prompt, e.target.value)}
            style={{
              marginTop: 12,
              padding: 6,
              fontSize: 14,
              borderRadius: 4,
              border: "1px solid #bbb",
              fontFamily: "inherit",
              width: "100%",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            <option value="OpenAI">OpenAI</option>
            <option value="Claude">Claude</option>
            <option value="Gemini">Gemini</option>
          </select>
          <button
            onClick={() => onDelete(id)}
            style={{
              marginTop: 12,
              padding: "8px 12px",
              background: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              alignSelf: "flex-start",
              fontWeight: "bold",
            }}
          >
            Delete Node
          </button>
          <Handle type="source" position={Position.Right} />
          <Handle type="target" position={Position.Left} />
        </>
      ) : (
        <>
          <div
            style={{
              marginBottom: 8,
              fontWeight: "bold",
              fontSize: 16,
              color: "#202124",
            }}
          >
            Response:
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 6,
              padding: 12,
              fontSize: 14,
              lineHeight: 1.4,
              color: "#333",
              maxHeight: 150,
              overflowY: "auto",
              fontFamily: "'Courier New', Courier, monospace",
              whiteSpace: "pre-wrap",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
              userSelect: "text",
            }}
          >
            {data.response || "No response yet..."}
          </div>
          <button
            onClick={handleCopy}
            style={{
              marginTop: 10,
              padding: "6px 10px",
              background: "#4a90e2",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: data.response ? "pointer" : "not-allowed",
              alignSelf: "flex-start",
              fontSize: 13,
              fontWeight: "bold",
              opacity: data.response ? 1 : 0.5,
            }}
            disabled={!data.response}
            title="Copy response to clipboard"
          >
            Copy Response
          </button>
          <Handle type="source" position={Position.Right} />
          <Handle type="target" position={Position.Left} />
        </>
      )}
    </div>
  );
}
