import { useEffect, useRef, useState } from "react";
import { BinaryTree } from "../utils/binary-tree";
import { createTree, initiateDrawing } from "../utils/helpers";

const TreeVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [values, setValues] = useState<string>("");

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
  }, []);

  const handleCreateTree = () => {
    if (values.trim().length === 0) return;
    const root: BinaryTree = createTree(values);
    initiateDrawing(root, canvasRef.current);
  };

  return (
    <div>
      <div>
        <textarea value={values} onChange={(e) => setValues(e.target.value)} />
        <button onClick={handleCreateTree}>Create Tree</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TreeVisualiser;
