import { useEffect, useRef } from "react";
import { BinaryTree } from "../utils/binary-tree";
import { drawTree, getActualTreeDimensions } from "../utils/helpers";

const TreeVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
    const root = new BinaryTree(1);
    const left = new BinaryTree(2);
    const right = new BinaryTree(3);
    root.setLeftNode(left);
    root.setRightNode(right);
    left.setLeftNode(new BinaryTree(4));
    left.setRightNode(new BinaryTree(5));
    const { treeActualHeight, treeActualWidth } = getActualTreeDimensions(root);
    const startX = (window.innerWidth - treeActualWidth) / 2;
    const endX = startX + treeActualWidth;

    drawTree(root, canvasRef.current, 1, startX, endX);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TreeVisualiser;
