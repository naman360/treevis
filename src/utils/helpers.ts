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
  context.fillText(node.value?.toString()!, arcX, arcY);
};

const drawTree = (
  root: BinaryTree,
  canvas: HTMLCanvasElement | null,
  startX: number,
  endX: number
) => {
  const arcCenterX = (startX + endX) / 2;
  const arcCenterY = DRAWING_CONFIG.nodeVerticalSpace / 2;
  drawNode(root, canvas, arcCenterX, arcCenterY);
};
export { getActualTreeDimensions, drawTree, drawNode };
