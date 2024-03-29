import {dijkstra, getNodesInShortestPathOrder} from './dijkstra.js';

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

//function makeRows originated from https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function makeRows(rows, cols, element) {
  var container = document.getElementById(element)
  container.style.setProperty('--grid-rows', rows)
  container.style.setProperty('--grid-cols', cols)

  //even though nodes are in 1d array, create them in double for loop for readablity
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){

      let node = createNode(i, j, (i*cols)+j)

      //default starting node at 0,0
      if(i == 0 && j == 0){
        removeExtraNodes('starting-point')
        node.setAttribute('data-value', 'starting-point')
        node.style.setProperty('background-color', 'green')
        node.addEventListener("mouseout",function(){
          node.style.setProperty('background-color', 'green')
        })
        //
      }

      //default end node at 9,9
      if(i == 9 && j == 9){
        if(node.getAttribute("data-value")!='wall'){
          removeExtraNodes('ending-point')
          node.setAttribute('data-value', 'ending-point')
          node.style.setProperty('background-color', 'black')
          node.addEventListener("mouseout",function(){
            node.style.setProperty('background-color', 'black')
          })
        }
      }

      //finally, add them all to the container
      container.appendChild(node).className = "grid-item";

    }
  }

  switch(document.querySelector('input[name = "pathing-option"]:checked').id) {
    case 'starting-point':
      startingPointGridItems()
      break;
    case 'ending-point':
      endingPointGridItems()
      break;
    case 'wall':
      wallGridItems()
      break;
    default:
      startingPointGridItems()
  }

};

window.calculateShortestPath = function() {
// var skillsSelect = document.getElementById("newSkill");
// var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
  var path = document.getElementById('path')
  var selectedPath = path.options[path.selectedIndex].text
  console.log(selectedPath)
  switch(selectedPath) {
    case 'Dijkstra\'s (Unweighted)':
      visualizeDijkstra()
      break;
    default:
      
  }
}

 window.visualizeDijkstra = function() {
  resetIsVisited()
  resetDistance()
  const startNode = getNodeByName('starting-point')
  const finishNode = getNodeByName('ending-point')
  const visitedNodesInOrder = dijkstra(startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDijkstra(visitedNodesInOrder, 'grid-item-visited');
  animateDijkstra(nodesInShortestPathOrder, 'grid-item-shortest-path', visitedNodesInOrder.length*50);
}

function animateDijkstra(visitedNodesInOrder, changeClass, offset=0){
  for(let i = 0; i < visitedNodesInOrder.length; i++){
    setTimeout(() => {
      const node = document.getElementById(visitedNodesInOrder[i].id)
      node.classList.add(changeClass)
    },(50 * i) + offset);

  }
}

function resetIsVisited(){
  var nodes = document.getElementsByClassName('grid-item');
  for(let i = 0; i < nodes.length; i++){
    var node = nodes[i]
    node.dataset.isvisited = false
  }
}

function resetDistance(){
  var nodes = document.getElementsByClassName('grid-item');
  for(let i = 0; i < nodes.length; i++){
    var node = nodes[i]
    node.dataset.distance = Infinity
  }
}

function getNodeByName(name){
  var gridItems = document.getElementsByClassName('grid-item');
  for(let i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    if(gridItem.getAttribute("data-value")==name){
      return(gridItem)
    }    
  }
}

function createNode(row, col, num){
  let node = document.createElement("div")
  node.style.setProperty('height', 'auto');
  node.style.setProperty('width', 'auto');
  node.setAttribute('data-row', row)
  node.setAttribute('data-col', col)
  node.setAttribute('data-isvisited', false)
  node.setAttribute('data-num', num)
  node.setAttribute('data-distance', Infinity)
  node.id = num
  node.addEventListener("mouseout",function(){
    this.style.setProperty('background-color', 'white')
  })
  return node;
}

function removeExtraNodes(nodeName){
  var gridItems = document.getElementsByClassName('grid-item');

  for(let i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    if(gridItem.getAttribute("data-value")==nodeName){
      gridItem.removeAttribute("data-value")
      gridItem.style.setProperty('background-color', 'white')
      gridItem.addEventListener("mouseout",function(){
        this.style.setProperty('background-color', 'white')
      })
      break
    }
  }
}

 window.startingPointGridItems = function(){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    gridItem.addEventListener("mouseover",function(){
      this.style.setProperty('background-color', 'green')
    })
    gridItem.onclick = function() {
      if(this.getAttribute("data-value")!='wall'){
        removeExtraNodes('starting-point')
        this.setAttribute('data-value', 'starting-point')
        this.addEventListener("mouseout",function(){
          this.style.setProperty('background-color', 'green')
        })
      }
    }
  }
}

window.endingPointGridItems = function(){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    gridItem.addEventListener("mouseover",function(){
      this.style.setProperty('background-color', 'black')
    })
    gridItem.onclick = function() {
      if(this.getAttribute("data-value")!='wall'){
        removeExtraNodes('ending-point')
        this.setAttribute('data-value', 'ending-point')
        this.addEventListener("mouseout",function(){
          this.style.setProperty('background-color', 'black')
        })
      }
    }
  }
}

 window.wallGridItems = function(){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    gridItem.addEventListener("mouseover",function(){
      this.style.setProperty('background-color', 'grey')
    })

    gridItem.onclick = function() {
      this.setAttribute('data-value', 'wall')
      this.addEventListener("mouseout",function(){
        this.style.setProperty('background-color', 'grey')
      })
    }
  }
}

function removeGridItems(){
  var gridItems = document.getElementsByClassName('grid-item')
  for(var i = gridItems.length-1; i>=0; i--){
    var gridItem = gridItems[i]
    gridItem.remove()
  }
}
  window.createNewGrid = function(){
  removeGridItems()
  var rows = document.getElementById("rows").value
  var cols = document.getElementById("cols").value
  makeRows(rows, cols, "container")
}

makeRows(document.getElementById("rows").value, document.getElementById("cols").value, "container");
