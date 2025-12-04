import { Tree } from "./BST.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Driver script
const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(randomArray);

console.log("Tree is balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order:");
tree.postOrder(node => console.log(node.data));

console.log("In Order:");
tree.inOrder(node => console.log(node.data));

// Pretty print the tree
console.log("Tree visualization:");
prettyPrint(tree.root);

// Unbalancing the tree
[101, 102, 103].forEach(value => tree.insert(value));
console.log("Tree is balanced after insertions:", tree.isBalanced());

// Pretty print the unbalanced tree
console.log("Unbalanced tree visualization:");
prettyPrint(tree.root);

// Rebalancing the tree
tree.rebalance();
console.log("Tree is balanced after rebalancing:", tree.isBalanced());

console.log("Level Order after rebalancing:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre Order after rebalancing:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order after rebalancing:");
tree.postOrder(node => console.log(node.data));

console.log("In Order after rebalancing:");
tree.inOrder(node => console.log(node.data));

// Pretty print the balanced tree
console.log("Balanced tree visualization:");
prettyPrint(tree.root);
