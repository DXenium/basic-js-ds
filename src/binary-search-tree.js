const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
    this.data = data;
  }
}
/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootItem = null;
  }

  root() {
    return this.rootItem;
  }

  add(data) {
    this.rootItem = addWithin(this.rootItem, data);
    console.log('\n  Add Items:' + data);
    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.value === data) {
        return node;
      }

      if (data < node.value) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.rootItem, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.value === data) {
        return true;
      }

      return data < node.value ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  find(data) {

    return searchWithinto(this.rootItem, data);

    function searchWithinto(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        return searchWithinto(node.left, data);
      }
      if (node.data < data) {
        return searchWithinto(node.right, data);
      }

      return null;
    }
  }

  remove(value) {
    this.rootItem = removeNode(this.rootItem, value);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.value < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }

        // both children exists for this item
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.value = minFromRight.value;

        node.right = removeNode(node.right, minFromRight.value);

        return node;
      }
    }
  }

  min() {
    if (!this.rootItem) {
      return;
    }

    let node = this.rootItem;
    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  max() {
    if (!this.rootItem) {
      return;
    }

    let node = this.rootItem;
    while (node.right) {
      node = node.right;
    }

    return node.value;
  }
}


module.exports = {
  BinarySearchTree
};