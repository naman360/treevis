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

const initiateDrawing = (
  root: BinaryTree,
  canvas: HTMLCanvasElement | null
) => {
  const context = canvas?.getContext("2d");
  if (!context) return;
  context?.clearRect(0, 0, canvas?.width!, canvas?.height!);
  const { treeActualHeight, treeActualWidth } = getActualTreeDimensions(root);
  const startX = (window.innerWidth - treeActualWidth) / 2;
  const endX = startX + treeActualWidth;
  drawTree(root, canvas, 0.5, startX, endX);
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

  drawNode(root, canvas, arcCenterX, arcCenterY);

  if (root.left) {
    drawTree(root.left, canvas, level + 1, startX, arcCenterX);
    drawEdges(
      canvas,
      arcCenterX,
      arcCenterY + DRAWING_CONFIG.circleRadius,
      (arcCenterX + startX) / 2,
      ((level + 1) * DRAWING_CONFIG.nodeVerticalSpace) / 2 -
        DRAWING_CONFIG.circleRadius
    );
  }
  if (root.right) {
    drawTree(root.right, canvas, level + 1, arcCenterX, endX);
    drawEdges(
      canvas,
      arcCenterX,
      arcCenterY + DRAWING_CONFIG.circleRadius,
      (arcCenterX + endX) / 2,
      ((level + 1) * DRAWING_CONFIG.nodeVerticalSpace) / 2 -
        DRAWING_CONFIG.circleRadius
    );
  }
};

const drawEdges = (
  canvas: HTMLCanvasElement | null,
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number
) => {
  const context = canvas?.getContext("2d");
  if (!context) return;
  context.beginPath();
  context.moveTo(xStart, yStart);
  context.strokeStyle = "#000";
  context.lineTo(xEnd, yEnd);
  context.stroke();
};

const _parseValues = (values: string) => {
  let parsedValues = "";
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== " ") parsedValues += values[i];
  }

  const valuesArray = parsedValues.split(",").map((el) => {
    if (el === "null") return null;
    return el;
  });
  return valuesArray;
};

const createTree = (values: string) => {
  let levelOrderTraversal = _parseValues(values);
  const queue: BinaryTree[] = [];
  let index = 0;
  const root = new BinaryTree(parseInt(levelOrderTraversal[index]!));
  index++;
  queue.push(root);
  console.log(levelOrderTraversal);
  while (queue.length > 0 && index < levelOrderTraversal.length) {
    const currentElement = queue.shift();
    console.log(currentElement);
    /* For left child */
    if (index < levelOrderTraversal.length) {
      if (levelOrderTraversal[index]) {
        const leftChild = new BinaryTree(parseInt(levelOrderTraversal[index]!));
        currentElement?.setLeftNode(leftChild);
        queue.push(leftChild);
      }
      index++;
    }

    /* For right child */
    if (index < levelOrderTraversal.length) {
      if (levelOrderTraversal[index]) {
        const rightChild = new BinaryTree(
          parseInt(levelOrderTraversal[index]!)
        );
        currentElement?.setRightNode(rightChild);
        queue.push(rightChild);
      }
      index++;
    }
  }

  return root;
};
export {
  getActualTreeDimensions,
  drawTree,
  drawNode,
  drawEdges,
  createTree,
  initiateDrawing,
};
