class Node {
  value: number | null = null;
  left: Node | null = null;
  right: Node | null = null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  setLeftNode(leftNode: Node) {
    this.left = leftNode;
  }

  setRightNode(rightNode: Node) {
    this.right = rightNode;
  }

  getTreeHeight(): number {
    const leftSubtree = this.left?.getTreeHeight() || 0;
    const rightSubtree = this.right?.getTreeHeight() || 0;
    return Math.max(leftSubtree, rightSubtree) + 1;
  }
}

export default Node;
