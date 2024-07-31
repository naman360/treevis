import { useEffect, useRef } from "react";
import { BinaryTree } from "../utils/binary-tree";
import { drawNode, drawTree, getActualTreeDimensions } from "../utils/helpers";
import { DRAWING_CONFIG } from "../utils/constants";

const TreeVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
    const root = new BinaryTree(1);
    root.setLeftNode(new BinaryTree(2));
    root.setLeftNode(new BinaryTree(3));
    const { treeActualHeight, treeActualWidth } = getActualTreeDimensions(root);
    const startX = (window.innerWidth - treeActualWidth) / 2;
    const endX = startX + treeActualWidth;

    drawTree(root, canvasRef.current, startX, endX);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TreeVisualiser;
