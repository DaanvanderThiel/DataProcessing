/* use this to test out your function */
window.onload = function() {
 	// changeColor();
  // countries pl,cy-,bg,dk path3884 = de = germany??
 changeColor("pl","yellow")
 changeColor("bg","pink")
 changeColor("it","Green")
 changeColor("de","blue")
//var svg =document.getElementsByTagName("svg")[0].getElementById("id");

}

// LET OP SOMS EEN OBJECT MEEGEVEN EN SOMS EEN STRING!!

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */

  //  console.log(document.getElementsByTagName("svg")[0])
  //  var svg =document.getElementsByTagName("svg")[0].getElementById("id");
  //  console.log(svg)

function changeColor(id, color) {
  s = document.getElementsByClassName(id)
  console.log(s);
  for (var i = 0; i < s.length; i++) {
    console.log((s[i].id));
    s[i].style.fill = color;
}
// console.log(id.style)

}
