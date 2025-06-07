import React from "react";

export default function ControlsPanel({ addNode }) {
  return (
    <div style={{ position: "absolute", zIndex: 10, left: 10, top: 10 }}>
      <button onClick={addNode}>Add Prompt/Response Node</button>
    </div>
  );
}
