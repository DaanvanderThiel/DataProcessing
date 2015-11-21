
tempertature =[]
date =[]
array2 =[]

var array = document.getElementById('data').value

var array = JSON.parse(array);
console.log(array)
console.log(new Date(19960505))

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
width = 1000;
height = 500;
ctx.canvas.width = width;
ctx.canvas.height = height;


transformx = createTransform([0,450],[0,width]);
transformy = createTransform([-200,400],[height,0]);

distanceFromLeft = transformx(30)
// y = 0
ctx.strokeRect(distanceFromLeft,transformy(0),transformx(366),1)
//x-as
ctx.strokeRect(distanceFromLeft,transformy(-100),transformx(366),1)
// y-as
ctx.beginPath();
ctx.moveTo(distanceFromLeft,transformy(350));
ctx.lineWidth = 2;
ctx.lineTo(distanceFromLeft,transformy(-100));
ctx.stroke()
// zet alle maanden er in met een streepje
months = ["January","February","March","April","May","June","July","August",
"September","October","November","December"]

for ( var l = 0; l < 12; l++){
  ctx.font = "13px serif";
  ctx.fillText(months[l], transformx(30.5*l+30),transformy(-150));
  ctx.beginPath();
  // weet niet waar de extra lijn vandaan komt maar vind het niet netjes om alles
  //zonder loop te doen??
  ctx.moveTo(transformx(30+30.5*(l+1)),transformy(-100));
  ctx.lineTo(transformx(30+30.5*(l+1)),transformy(-90));
  ctx.stroke();
};
ctx.font = '800 20px Arial'
ctx.fillText("month",transformx(391),transformy(-120));


ctx.font = "13px serif"
// zet de temperatuur en het streepje erbij
ctx.fillText(" 0",transformx(20),transformy(0))
ctx.strokeRect(distanceFromLeft-10,transformy(0),10,1)
ctx.fillText("10",transformx(20),transformy(100))
ctx.strokeRect(distanceFromLeft-10,transformy(100),10,1)
ctx.fillText("20",transformx(20),transformy(200))
ctx.strokeRect(distanceFromLeft-10,transformy(200),10,1)
ctx.fillText("30",transformx(20),transformy(300))
ctx.strokeRect(distanceFromLeft-10,transformy(300),10,1)
ctx.fillText("-10",transformx(20),transformy(-100))
ctx.strokeRect(distanceFromLeft-5,transformy(-100),5,1)

// voor elke variabele in de array line aanmaken!
k = 30
for ( var i = 0 ; i < 366; i++){
  ctx.lineTo(transformx(k),transformy(array[i][1]));
  ctx.strokeStyle = 'lightgray';
  k++
};
ctx.stroke()
ctx.font = "30px serif";
ctx.fillText("Maximum Temperature in the Bild(NL) 1996", 160, 30);

function createTransform(domain, range){
	// domain is a two-element array of the domain's bounds
	// range is a two-element array of the range's bounds
	// implement the actual calculation here b = range[0] - a*domain[0]
	// a = range[1]-range[0]/domain[1]-domain[0]
	var alpha = (range[1]-range[0])/(domain[1]-domain[0]) ;
	var beta = range[0]-alpha*domain[0];

	// get rid of the padding of the range
	return function(x){

	return (alpha * x) + beta;
	};
}

ctx.font = "30px serif"
ctx.rotate((Math.PI/180*-90))
ctx.fillText('Temperature in Celcius',transformx(-170),transformy(355))
// maak tweede canvas
var canvas2 = document.getElementById('canvas2');
var context = canvas2.getContext('2d');
context.canvas.width = width;
context.canvas.height = height;
var rect = canvas2.getBoundingClientRect();
console.log(rect.left)
function showCoords(event) {
     x = event.clientX;
     y = event.clientY;
     context.clearRect(0,0,width,height)
    // var coor = "X coords: " + x + ", Y coords: " + y;
    // document.getElementById("demo").innerHTML = coor;
    context.beginPath();
    context.moveTo(x,418);
    context.lineTo(x,50);
    context.stroke();
    context.beginPath();
    context.moveTo(distanceFromLeft,transformy(array[Math.round((x/813)*366-30)][1]));
    context.lineTo(888,transformy(array[Math.round((x/813)*366-30)][1]));
    context.stroke();
    document.getElementById("tagH").innerHTML = "";
    document.getElementById("tagV").innerHTML = "";



}
// clear de lijnen
function clearCoor() {
    document.getElementById("canvaslijn").innerHTML = "";
}
console.log(transformx(75))
console.log(transformx(880))
// zet alles om in pixels voor de variabelen
function pixeltransform(number){

  t = "px"
  c = number.toString().concat(t);

  return  c; // werkt niet lulz??

}
  // pas de variabelen aan zodat dit de juiste datum en temperatuur geeft + zet het op de juiste plaats

    document.getElementById('canvas2').onmouseout = function () {
        timer = setTimeout(function () {
          document.getElementById("tagH").innerHTML = (array[Math.round((x/813)*366-30)][0]);
          document.getElementById("tagV").innerHTML = (array[Math.round((x/813)*366-30)][1])/10;
          document.getElementById("tagH").style.top = pixeltransform(transformy(array[Math.round((x/813)*366-30)][1])+60);
          document.getElementById("tagH").style.left = pixeltransform(x+30);//pixeltransform(x);
          document.getElementById("tagV").style.top = pixeltransform(transformy(array[Math.round((x/813)*366-30)][1]));
          document.getElementById("tagV").style.left = pixeltransform(x-50);

        }, 200);
    }

    var timeoutID;
    // reset de timer als er wel beweging is zo niet dan word de data weergeven na 1 seconde
    function setup() {
        this.addEventListener("mousemove", resetTimer, false);
        startTimer();
    }
    setup();

    function startTimer() {
        // roept na 1 seconde goInactive aan
        timeoutID = window.setTimeout(goInactive, 1000);
    }

    function resetTimer(e) {
        window.clearTimeout(timeoutID);
        startTimer()
    }

    function goInactive() {
      document.getElementById("tagH").innerHTML = (array[Math.round((x/813)*366-30)][0]);
      document.getElementById("tagV").innerHTML = (array[Math.round((x/813)*366-30)][1])/10;
      document.getElementById("tagH").style.top = pixeltransform(transformy(array[Math.round((x/813)*366-30)][1])+60);
      document.getElementById("tagH").style.left = pixeltransform(x+30);//pixeltransform(x);
      document.getElementById("tagV").style.top = pixeltransform(transformy(array[Math.round((x/813)*366-30)][1]));
      document.getElementById("tagV").style.left = pixeltransform(x-50);

    }
