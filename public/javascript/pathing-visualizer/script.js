var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



//function makeRows originated from https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function makeRows(rows, cols, element) {
  var container = document.getElementById(element)
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  //container.style.setProperty('width', cols*3)
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    // cell.style.setProperty('height', cell.style.getPropertyValue('width'));
    cell.style.setProperty('height', 'auto');
    cell.style.setProperty('width', 'auto');
    container.appendChild(cell).className = "grid-item";
  }
  onClickGridItems();

};

function makeRows2(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  container.style.setProperty('width', cols*3)
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    // cell.style.setProperty('height', cell.style.getPropertyValue('width'));
    cell.style.setProperty('height', 'auto');
    cell.style.setProperty('width', 'auto');
    cell.style.setProperty('background-color', 'red');
    container.appendChild(cell).className = "grid-item";
  }
  onClickGridItems();

};

function onClickGridItems(){
  var gridItems = document.getElementsByClassName('grid-item');
  for(var i = 0; i < gridItems.length; i++) {
      var gridItem = gridItems[i];
      gridItem.onclick = function() {
        //alert("Cli");
    }
  }
  if(document.getElementById('starting-point').checked == true){
    for(var i = 0; i < gridItems.length; i++) {
      var gridItem = gridItems[i];
      gridItem.addEventListener("mouseover",function(){
        this.style.setProperty('background-color', '#0000ff')
      })
      gridItem.addEventListener("mouseout",function(){
        this.style.setProperty('background-color', 'white')
      })
    }
  }
  
  if(document.getElementById('ending-point').checked == true){

  }
  if(document.getElementById('wall').checked == true){

  }
}

function removeGridItems(){
  gridItems = document.getElementsByClassName('grid-item')
  for(var i = gridItems.length-1; i>=0; i--){
    var gridItem = gridItems[i]
    console.log('hello')
    gridItem.remove()
  }
}

function createNewGrid(){
  removeGridItems()
  rows = document.getElementById("rows").value
  cols = document.getElementById("cols").value
  console.log(rows + cols)
  makeRows(rows, cols, "container")
}

makeRows(rows = document.getElementById("rows").value, document.getElementById("cols").value, "container");

// container.remove()
// test = document.createElement("div");
// test.id = "container"
// makeRows(32, 32, "container");

