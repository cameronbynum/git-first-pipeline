var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const container = document.getElementById("container");
const gridItem = document.getElementsByClassName("grid-item")

//function makeRows originated from https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  container.style.setProperty('width', cols*3)
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    // cell.style.setProperty('height', cell.style.getPropertyValue('width'));
    cell.style.setProperty('height', 'auto');
    cell.style.setProperty('width', 'auto');
    container.appendChild(cell).className = "grid-item";
    
  };

  var gridItems = document.getElementsByClassName('grid-item');
  for(var i = 0; i < gridItems.length; i++) {
      var gridItem = gridItems[i];
      gridItem.onclick = function() {
        alert(gridItem.data);
    }
  }
};


makeRows(32, 32);