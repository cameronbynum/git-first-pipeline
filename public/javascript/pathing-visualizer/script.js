
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
  // for (c = 0; c < (rows * cols); c++) {
  //   let node = createNode()
  //   container.appendChild(node).className = "grid-item";
  // }
  for(let i = 0; i < rows; i++){
    console.log("howdy")
    for(let j = 0; j < cols; j++){
      let node = createNode(i, j)
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

function createNode(row, col){
  let node = document.createElement("div")
  node.style.setProperty('height', 'auto');
  node.style.setProperty('width', 'auto');
  node.setAttribute('data-row', row)
  node.setAttribute('data-row', col)
  node.setAttribute('data-isVisited', false)
  //node.id = ('grid-item: ' + (c+1))
  node.addEventListener("mouseout",function(){
    this.style.setProperty('background-color', 'white')
  })

  return node;
}

function removeExtraPoints(pointName){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    if(gridItem.getAttribute("data-value")==pointName){
      gridItem.removeAttribute("data-value")
      gridItem.style.setProperty('background-color', 'white')
      gridItem.addEventListener("mouseout",function(){
        this.style.setProperty('background-color', 'white')
      })
      break
    }
    
    
  }
}

function startingPointGridItems(){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    gridItem.addEventListener("mouseover",function(){
      this.style.setProperty('background-color', 'red')
    })
    gridItem.onclick = function() {
      if(this.getAttribute("data-value")!='wall'){
        removeExtraPoints('starting-point')
        this.setAttribute('data-value', 'starting-point')
        this.addEventListener("mouseout",function(){
          this.style.setProperty('background-color', 'red')
        })
      }
    }
  }
}

function endingPointGridItems(){
  var gridItems = document.getElementsByClassName('grid-item');

  for(var i = 0; i < gridItems.length; i++) {
    var gridItem = gridItems[i];
    gridItem.addEventListener("mouseover",function(){
      this.style.setProperty('background-color', 'black')
    })
    gridItem.onclick = function() {
      if(this.getAttribute("data-value")!='wall'){
        removeExtraPoints('ending-point')
        this.setAttribute('data-value', 'ending-point')
        this.addEventListener("mouseout",function(){
          this.style.setProperty('background-color', 'black')
        })
      }
    }
  }
}

function wallGridItems(){
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
  gridItems = document.getElementsByClassName('grid-item')
  for(var i = gridItems.length-1; i>=0; i--){
    var gridItem = gridItems[i]
    gridItem.remove()
  }
}

function createNewGrid(){
  removeGridItems()
  rows = document.getElementById("rows").value
  cols = document.getElementById("cols").value
  makeRows(rows, cols, "container")
}

makeRows(rows = document.getElementById("rows").value, document.getElementById("cols").value, "container");

// container.remove()
// test = document.createElement("div");
// test.id = "container"
// makeRows(32, 32, "container");

