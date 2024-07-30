import { Node } from "./binary-tree";
import { DRAWING_CONFIG } from "./constants";

const getActualTreeDimensions = (root: Node) => {
  const treeActualHeight =
    root.getTreeHeight() * DRAWING_CONFIG.nodeVerticalSpace;
  const treeActualWidth =
    root.getTreeHeight() * DRAWING_CONFIG.nodeHorizontalSpace;
  return { treeActualHeight, treeActualWidth };
};

export { getActualTreeDimensions };
