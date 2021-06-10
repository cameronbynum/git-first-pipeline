// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(startNode, finishNode) {
  const visitedNodesInOrder = [];
  //console.log(startNode)
  startNode.dataset.distance = 0  ;
  console.log(startNode)
  const unvisitedNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  //console.log(unvisitedNodes)
  //console.log(unvisitedNodes)
  const allNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //console.log(closestNode)
    // If we encounter a wall, we skip it.
    if (closestNode.dataset.value=='wall') continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.dataset.distance === Infinity) return visitedNodesInOrder;
    //console.log(closestNode.dataset.isvisited)
    //closestNode.dataset.isvisited = true;
    //console.log(closestNode.dataset.isvisited)
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, allNodes);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  console.log(unvisitedNodes[0].dataset.distance)
  //todo may not be sorting, create function
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.dataset.distance - nodeB.dataset.distance);
}

function updateUnvisitedNeighbors(node, allNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, allNodes);
  //console.log(unvisitedNeighbors)
  for (const neighbor of unvisitedNeighbors) {
    //console.log(node.dataset.distance)
    neighbor.dataset.distance = +node.dataset.distance + 1;
    //console.log(neighbor.dataset.distance)
    //console.log(node)
    neighbor.setAttribute('data-previousNode', node.dataset.num)
  }
}

function getUnvisitedNeighbors(node, allNodes) {
  const neighbors = [];
  const col = parseInt(node.dataset.col)
  const row = parseInt(node.dataset.row)
  const maxRows = parseInt(document.getElementById("rows").value)
  const maxCols = parseInt(document.getElementById("cols").value)
  // console.log(row)
  // console.log(col)
  // console.log(node)
  // console.log(allNodes[(row*maxCols + col)])
  //if row is zero then no neighbor above
  if (row > 0){ 
    neighbors.push(allNodes[((row*maxCols + col)-maxCols)])
    //console.log("1")
  }
  //if row is last row then no neighbor beneath
  if (row < maxRows-1){
    neighbors.push(allNodes[((row*maxCols + col)+maxCols)])
    //console.log("2")
  }
  //if col is zero then no neighbor to left
  if (col > 0) {
    neighbors.push(allNodes[parseInt((row*maxCols + col)-1)])
    //console.log("3")
    console.log(allNodes[parseInt((row*maxCols + col)-1)].dataset.isvisited)
    console.log(allNodes[parseInt((row*maxCols + col)-1)])
  }
  //if col is last col then no neighbor to right
  if (col < maxCols){
    neighbors.push(allNodes[parseInt((row*maxCols + col)+1)])
    //console.log("4")
  }
  console.log(neighbors[0].dataset.isvisited)
  //todo not filtering, create function
  return neighbors.filter(neighbor => !neighbor.dataset.isvisited);
}

function getNodeByNum(num){
  const nodes = [].slice.call(document.getElementsByClassName('grid-item'));
  for(let i = 0; i < nodes.length; i++){
    var node = nodes[i]
    if(node.dataset.num == num) return node
  }
  return null

}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
     console.log(currentNode)
    // console.log(currentNode.dataset.previousNode)
    nodesInShortestPathOrder.unshift(currentNode);
    console.log(getNodeByNum(currentNode.dataset.previousnode))
    currentNode = getNodeByNum(currentNode.dataset.previousnode)
    console.log(currentNode)
  }
  return nodesInShortestPathOrder;
}