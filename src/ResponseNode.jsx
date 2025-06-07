// src/ResponseNode.jsx
import React from 'react'
import { Handle, Position } from 'reactflow'

function ResponseNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #555',
        borderRadius: 5,
        width: 220,
        background: '#f0f0d0',
        whiteSpace: 'pre-wrap',
        minHeight: 80,
      }}
    >
      <div><strong>Response</strong></div>
      <div style={{ marginTop: 8 }}>{data.response}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  )
}

export default ResponseNode
