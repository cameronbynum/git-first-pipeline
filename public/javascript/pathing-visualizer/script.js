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
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  //container.style.setProperty('width', cols*3)
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    // cell.style.setProperty('height', cell.style.getPropertyValue('width'));
    cell.style.setProperty('height', 'auto');
    cell.style.setProperty('width', 'auto');
    cell.setAttribute('data-num', c+1)
    cell.id = ('grid-item: ' + (c+1))
    cell.addEventListener("mouseout",function(){
      this.style.setProperty('background-color', 'white')
    })
    //el.setAttribute('data-foo', 'Hello World!');
    container.appendChild(cell).className = "grid-item";
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

