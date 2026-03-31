console.log("Hello, from external js file!");

function btnClickHandler() {
  console.log("Button clicked!");
  let para = document.getElementById("myDiv");
  para.innerHTML = "Button was clicked!";
  para.style.backgroundColor = "aqua";
}

$("#myDiv").css("background-color", "yellow");
$(this).css("background-color", "lightgreen");