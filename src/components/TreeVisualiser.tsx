import { useEffect, useRef, useState } from "react";
import { BinaryTree } from "../utils/binary-tree";
import { drawTree, getActualTreeDimensions } from "../utils/helpers";

const TreeVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [values, setValues] = useState<string>("");
  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
    const root = new BinaryTree(1);

    const level1Left = new BinaryTree(2);
    const level1Right = new BinaryTree(3);

    const level2LeftLeft = new BinaryTree(4);
    const level2LeftRight = new BinaryTree(5);
    const level2RightLeft = new BinaryTree(6);
    const level2RightRight = new BinaryTree(7);

    const level3LeftLeftLeft = new BinaryTree(8);
    const level3LeftLeftRight = new BinaryTree(9);
    const level3LeftRightLeft = new BinaryTree(10);
    const level3RightLeftRight = new BinaryTree(11);
    const level3RightRightLeft = new BinaryTree(12);

    // Level 1
    root.setLeftNode(level1Left);
    root.setRightNode(level1Right);

    // Level 2
    level1Left.setLeftNode(level2LeftLeft);
    level1Left.setRightNode(level2LeftRight);
    level1Right.setLeftNode(level2RightLeft);
    level1Right.setRightNode(level2RightRight);

    // Level 3
    level2LeftLeft.setLeftNode(level3LeftLeftLeft);
    level2LeftLeft.setRightNode(level3LeftLeftRight);
    level2LeftRight.setLeftNode(level3LeftRightLeft);
    level2RightLeft.setRightNode(level3RightLeftRight);
    level2RightRight.setLeftNode(level3RightRightLeft);
    const { treeActualHeight, treeActualWidth } = getActualTreeDimensions(root);
    const startX = (window.innerWidth - treeActualWidth) / 2;
    const endX = startX + treeActualWidth;

    drawTree(root, canvasRef.current, 0.5, startX, endX);
  }, []);

  return (
    <div>
      <div>
        <textarea value={values} onChange={(e) => setValues(e.target.value)} />
        <button>Create Tree</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TreeVisualiser;
