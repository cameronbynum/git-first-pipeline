// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.dataset.distance = Infinity;
  

  //const unvisitedNodes = getAllNodes(grid);
  const unvisitedNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  const allNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  //console.log((unvisitedNodes))

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //console.log(closestNode)
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.dataset.distance === Infinity) return visitedNodesInOrder;
    closestNode.dataset.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, allNodes);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  Array.prototype.slice(unvisitedNodes).sort((nodeA, nodeB) => nodeA.dataset.distance - nodeB.dataset.distance);
}

function updateUnvisitedNeighbors(node, allNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, allNodes);
  //console.log(unvisitedNeighbors)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.dataset.distance = node.dataset.distance + 1;
    console.log(node.dataset.distance + 1)
    neighbor.style.setProperty('data-previousnode', node)
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, allNodes) {
  const neighbors = [];
  const col = parseInt(node.dataset.col)
  const row = parseInt(node.dataset.row)
  const maxRows = parseInt(document.getElementById("rows").value) - 1
  const maxCols = parseInt(document.getElementById("cols").value) - 1
  console.log(row)
  console.log(col)
  //if (row > 0) neighbors.push(allNodes[row - 1][col]);
  //if row is zero then no neighbor above
  if (row > 0) neighbors.push(allNodes[parseInt((row*maxCols + col))])
  //if (row < allNodes.length - 1) neighbors.push(allNodes[row + 1][col]);
  //if row is last row then no neighbor beneath
  if (row < maxRows - 1) neighbors.push(allNodes[parseInt((row*maxCols + col) + maxCols + 1)])
  //if (col > 0) neighbors.push(allNodes[row][col - 1]);
  //if col is zero then no neighbor above
  if (col > 0) neighbors.push(allNodes[parseInt((row*maxCols + col)+1)])
  if (col < allNodes[0].length - 1) neighbors.push(allNodes[(row*document.getElementById("cols").value + col)+1]);
  //if col is last col then no neighbor beneath
  // console.log("col: " + col)
  // console.log("Max Rows: " + maxRows)
  // console.log("row: " + row)
  const num =((col*maxRows) + row) + 1

  console.log(num)
  if (col < maxCols - 1) neighbors.push(allNodes[parseInt((col*maxRows + row)+1)])
  console.log(neighbors)
  return neighbors.filter(neighbor => !neighbor.dataset.isVisited);
}

// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    //console.log(currentNode)
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.dataset.previousNode;
  }
  return nodesInShortestPathOrder;
}