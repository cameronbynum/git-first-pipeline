// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.dataset.distance = 0;
  startNode.dataset.isvisited = true;
  const unvisitedNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  const allNodes = [].slice.call(document.getElementsByClassName('grid-item'));
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.dataset.value=='wall') continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.dataset.distance === Infinity) return visitedNodesInOrder;
    //closestNode.dataset.isvisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, allNodes);
  }
}

function sortNodesByDistance(unvisitedNodes) {

  unvisitedNodes.sort((nodeA, nodeB) => nodeA.dataset.distance - nodeB.dataset.distance);
  // var node = document.getElementById(unvisitedNodes[0].id)
  // node.innerHTML = (unvisitedNodes[0].dataset.distance)
}

function updateUnvisitedNeighbors(node, allNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, allNodes);
  //console.log(unvisitedNeighbors)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.dataset.distance = +node.dataset.distance + 1;
    neighbor.setAttribute('data-previousnode', node.dataset.num)
    neighbor.dataset.isvisited = true
    //console.log(neighbor)
    // var node = document.getElementById(unvisitedNodes[0].id)
    // node.innerHTML = (unvisitedNodes[0].dataset.previousnode)
  }
}

function getUnvisitedNeighbors(node, allNodes) {
  const neighbors = [];
  const col = parseInt(node.dataset.col)
  const row = parseInt(node.dataset.row)
  const maxRows = parseInt(document.getElementById("rows").value)
  const maxCols = parseInt(document.getElementById("cols").value)
  //if row is zero then no neighbor above
  if (row > 0){ 
    neighbors.push(allNodes[((row*maxCols + col)-maxCols)])
  }
  //if row is last row then no neighbor beneath
  if (row < maxRows-1){
    neighbors.push(allNodes[((row*maxCols + col)+maxCols)])
  }
  //if col is zero then no neighbor to left
  if (col > 0) {
    neighbors.push(allNodes[parseInt((row*maxCols + col)-1)])
  }
  //if col is last col then no neighbor to right
  if (col < maxCols-1){
    neighbors.push(allNodes[parseInt((row*maxCols + col)+1)])
  }
  console.log(filterNeighbors(neighbors))
  return filterNeighbors(neighbors)
}

function filterNeighbors(neighbors){
  var filteredNeighbors = []

  
  for(let i = 0; i < neighbors.length; i++){
    let neighbor = neighbors[i]
    if(neighbor.dataset.isvisited != true){
      filteredNeighbors.push(neighbor)
      console.log(neighbor.dataset.isvisited)
    }
    else{
      console.log(neighbor.dataset.isvisited)
    }
  }
  
  return filteredNeighbors
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
  for(let i = 0; i < 10; i++){
    //console.log(currentNode)
    console.log(currentNode.dataset.previousnode)
    nodesInShortestPathOrder.unshift(currentNode);
    //console.log(getNodeByNum(currentNode.dataset.previousnode))
    currentNode = getNodeByNum(currentNode.dataset.previousnode)
    //console.log(currentNode)
  }
  // while (currentNode !== null) {
  //    console.log(currentNode)
  //   console.log(currentNode.dataset.previousnode)
  //   nodesInShortestPathOrder.unshift(currentNode);
  //   console.log(getNodeByNum(currentNode.dataset.previousnode))
  //   currentNode = getNodeByNum(currentNode.dataset.previousnode)
  //   console.log(currentNode)
  // }
  return nodesInShortestPathOrder;
}