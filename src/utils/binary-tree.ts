export type Node = {
  value: number | null;
  left: Node | null;
  right: Node | null;
  getTreeHeight: () => number;
};
export class BinaryTree {
  value: number | null = null;
  left: BinaryTree | null = null;
  right: BinaryTree | null = null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  setLeftNode(leftNode: BinaryTree) {
    this.left = leftNode;
  }

  setRightNode(rightNode: BinaryTree) {
    this.right = rightNode;
  }

  getTreeHeight(): number {
    const leftSubtree = this.left?.getTreeHeight() || 0;
    const rightSubtree = this.right?.getTreeHeight() || 0;
    return Math.max(leftSubtree, rightSubtree) + 1;
  }
}
