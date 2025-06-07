// src/PromptNode.jsx
import React from 'react'
import { Handle, Position } from 'reactflow'

function PromptNode({ id, data }) {
  const { prompt, model, onPromptChange } = data

  const handleChange = (e) => {
    onPromptChange(id, e.target.value)
  }

  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #555',
        borderRadius: 5,
        width: 220,
        background: '#d0f0fd',
      }}
    >
      <div><strong>{model} Prompt</strong></div>
      <textarea
        value={prompt}
        onChange={handleChange}
        rows={4}
        style={{ width: '100%', marginTop: 6, fontSize: 14 }}
        placeholder="Type prompt here..."
      />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default PromptNode
