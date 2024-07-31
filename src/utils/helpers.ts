import { BinaryTree, Node } from "./binary-tree";
import { DRAWING_CONFIG } from "./constants";

const getActualTreeDimensions = (root: Node) => {
  const treeActualHeight =
    root.getTreeHeight() * DRAWING_CONFIG.nodeVerticalSpace;
  const treeActualWidth =
    Math.pow(2, root.getTreeHeight()) * DRAWING_CONFIG.nodeHorizontalSpace;
  return { treeActualHeight, treeActualWidth };
};

const drawNode = (
  node: BinaryTree,
  canvas: HTMLCanvasElement | null,
  arcX: number,
  arcY: number
) => {
  const context = canvas?.getContext("2d");
  if (!context) return;
  context.beginPath();
  context.arc(arcX, arcY, DRAWING_CONFIG.circleRadius, 0, 2 * Math.PI);
  context.fillStyle = "#90EE90";
  context.fill();

  /* For drawing border */
  context.beginPath();
  context.arc(arcX, arcY, DRAWING_CONFIG.circleRadius, 0, 2 * Math.PI);
  context.fillStyle = "#000";
  context.stroke();

  /* For drawing node value */
  context.font = `${DRAWING_CONFIG.fontSize}px serif`;
  context.textAlign = "center";
  context.fillText(
    node.value?.toString()!,
    arcX,
    arcY + DRAWING_CONFIG.fontSize / 2
  );
};

const drawTree = (
  root: BinaryTree,
  canvas: HTMLCanvasElement | null,
  level: number,
  startX: number,
  endX: number
) => {
  const arcCenterX = (startX + endX) / 2; /* Midpoint of tree area on X axis */
  const arcCenterY = (level * DRAWING_CONFIG.nodeVerticalSpace) / 2;
  console.log(root.value);
  drawNode(root, canvas, arcCenterX, arcCenterY);
  if (root.left) {
    drawTree(root.left, canvas, level + 1, startX, arcCenterX);
  }
  if (root.right) {
    drawTree(root.right, canvas, level + 1, arcCenterX, endX);
  }
};
export { getActualTreeDimensions, drawTree, drawNode };
