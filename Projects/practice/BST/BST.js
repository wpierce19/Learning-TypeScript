// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Tree class
class Tree {
    constructor(array) {
        // Initialize the tree by building it from a sorted, unique array
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array) {
        // Recursively build a balanced binary tree from a sorted array
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid)); // Left subtree
        root.right = this.buildTree(array.slice(mid + 1)); // Right subtree

        return root;
    }

    insert(value, node = this.root) {
        // Insert a value into the tree, maintaining BST properties
        if (!node) return new Node(value);

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        // Delete a node with the given value from the tree
        if (!node) return null;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            // Node found
            if (!node.left) return node.right; // No left child
            if (!node.right) return node.left; // No right child

            // Node has two children: replace with the smallest value in the right subtree
            const minRight = this.findMin(node.right);
            node.data = minRight.data;
            node.right = this.deleteItem(minRight.data, node.right);
        }

        return node;
    }

    findMin(node) {
        // Find the node with the smallest value in a subtree
        while (node.left) node = node.left;
        return node;
    }

    find(value, node = this.root) {
        // Find a node with the given value
        if (!node || node.data === value) return node;

        if (value < node.data) return this.find(value, node.left);
        return this.find(value, node.right);
    }

    levelOrder(callback) {
        // Perform level-order (breadth-first) traversal
        if (!callback) throw new Error("Callback is required");

        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback, node = this.root) {
        // Perform in-order (left, root, right) traversal
        if (!callback) throw new Error("Callback is required");
        if (node) {
            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);
        }
    }

    preOrder(callback, node = this.root) {
        // Perform pre-order (root, left, right) traversal
        if (!callback) throw new Error("Callback is required");
        if (node) {
            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);
        }
    }

    postOrder(callback, node = this.root) {
        // Perform post-order (left, right, root) traversal
        if (!callback) throw new Error("Callback is required");
        if (node) {
            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);
        }
    }

    height(node) {
        // Calculate the height of a node (number of edges on the longest path to a leaf)
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node, current = this.root, depth = 0) {
        // Calculate the depth of a node (number of edges from the root)
        if (!current) return -1;
        if (current === node) return depth;

        if (node.data < current.data) {
            return this.depth(node, current.left, depth + 1);
        }
        return this.depth(node, current.right, depth + 1);
    }

    isBalanced(node = this.root) {
        // Check if the tree is balanced (height difference between subtrees <= 1)
        if (!node) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }

    rebalance() {
        // Rebalance the tree to ensure it is balanced
        const values = [];
        this.inOrder(node => values.push(node.data));
        this.root = this.buildTree(values);
    }
}