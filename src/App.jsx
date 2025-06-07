import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import ModelNode from "./ModelNode";
import ControlsPanel from "./ControlsPanel";
import { getMockResponse } from "./mockResponses";

const nodeTypes = {
  prompt: (props) => (
    <ModelNode
      {...props}
      type="prompt"
      onPromptChange={props.data.onPromptChange}
      onDelete={props.data.onDelete}
    />
  ),
  response: (props) => <ModelNode {...props} type="response" />,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onPromptChange = useCallback(
    (id, newPrompt, newModel) => {
      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          if (node.id === id) {
            const updatedData = { ...node.data, prompt: newPrompt };
            if (newModel) updatedData.model = newModel;
            return { ...node, data: updatedData };
          }
          return node;
        });

        const promptNode = updatedNodes.find((n) => n.id === id);
        if (promptNode) {
          const responseNodeId = id.replace("prompt", "response");
          const mockResp = getMockResponse(
            promptNode.data.model,
            promptNode.data.prompt
          );
          return updatedNodes.map((node) =>
            node.id === responseNodeId
              ? { ...node, data: { ...node.data, response: mockResp } }
              : node
          );
        }

        return updatedNodes;
      });
    },
    [setNodes]
  );

  const onDelete = useCallback(
    (id) => {
      setNodes((nds) =>
        nds.filter(
          (node) =>
            node.id !== id && node.id !== id.replace("prompt", "response")
        )
      );
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== id &&
            edge.target !== id &&
            edge.source !== id.replace("prompt", "response") &&
            edge.target !== id.replace("prompt", "response")
        )
      );
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            width: Math.min(Math.max(width * 0.2, 200), 400),
            onPromptChange,
            onDelete,
            prompt: node.data.prompt ?? "",
            model: node.data.model ?? "OpenAI",
            response: node.data.response ?? "",
          },
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onPromptChange, onDelete, setNodes]);

  const addNode = useCallback(() => {
    const id = `${Date.now()}`;

    const nodeWidth = Math.min(Math.max(windowWidth * 0.2, 200), 400);

    const promptNode = {
      id: `prompt-${id}`,
      type: "prompt",
      position: { x: 50, y: 50 + nodes.length * 150 },
      data: {
        prompt: "",
        model: "OpenAI",
        onPromptChange,
        onDelete,
        width: nodeWidth,
      },
    };

    const responseNode = {
      id: `response-${id}`,
      type: "response",
      position: { x: 350, y: 50 + nodes.length * 150 },
      data: { response: "", width: nodeWidth },
    };

    setNodes((nds) => [...nds, promptNode, responseNode]);

    setEdges((eds) => [
      ...eds,
      {
        id: `e-${promptNode.id}-${responseNode.id}`,
        source: promptNode.id,
        target: responseNode.id,
        type: "smoothstep",
      },
    ]);
  }, [windowWidth, nodes.length, onPromptChange, onDelete, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ControlsPanel addNode={addNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ width: "100%", height: "100%" }}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
