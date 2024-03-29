interface Node {
  name: string;
  children?: Node[];
}

interface blocksCache {
  [key: string]: number;
}

const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

export function buildLayerTree(layerList: string[]): Node {
  const tree: Node = { name: 'Model', children: [] };
  const blocks: blocksCache = {};

  // populate cache
  layerList.forEach((layer) => {
    const layerName = layer.split('_');
    let name = layerName[0];
    if (layerName.length > 1 && numbers.has(layerName[1][0])) {
      name += layerName[1];
    }
    if (!blocks[name]) blocks[name] = 0;
    blocks[name]++;
  });

  console.log(blocks);

  // populate tree
  layerList.forEach((layer) => {
    const layerName = layer.split('_');
    const newNode: Node = { name: layer };

    let nodeName = layerName[0];
    if (layerName.length > 1 && numbers.has(layerName[1][0])) {
      nodeName += layerName[1];
    }

    // check if not in a block
    if (blocks[nodeName] === 1) {
      tree.children?.push(newNode);
      return;
    }

    // check if block was already made
    let nodePushed = false;
    tree.children?.forEach((node) => {
      if (node.name === nodeName) {
        node.children?.push(newNode);
        nodePushed = true;
      }
    });

    // make block
    if (!nodePushed) {
      const block: Node = { name: nodeName, children: [newNode] };
      tree.children?.push(block);
    }
  });

  return tree;
}
