
tempertature =[]
date =[]
array2 =[]

var array = document.getElementById('data').value
console.log(array)
var array = JSON.parse(array);
console.log(array)
console.log(array[0][0])
console.log(array[0][1])
// for (var i = 0; i < 366; i++){
//   array2.push(array[i].split(','));
// }
//
// for (var i = 0; i < 366; i++){
//   tempertature.push(array2[i][1]);
//   date.push(array2[i][0]);
// }
// maak de canvas aan
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
width = 1000;
height = 500;
ctx.canvas.width = width;
ctx.canvas.height = height;
// opletten ;!


transformx = createTransform([0,450],[0,width]);
transformy = createTransform([-200,400],[height,0]);

distanceFromLeft = transformx(30)
console.log('hello')
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
  //ctx.lineTo(transformx(k),transformy(tempertature[i]))
  k++
};
ctx.stroke()
ctx.font = "48px serif";
ctx.fillText("Maximum Temperature in the Bild(NL) 1996", 90, 50);




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

inversecreateTransformx = inversecreateTransform([0,width],[0,450]);


// to use this for instance:
var transform = createTransform([10, 20], [10, 20]);
//console.log(transform(15)); //should return 15!!
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
    var x = event.clientX;
    var y = event.clientY;
    context.clearRect(0,0,width,height)
    var coor = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coor;
    context.beginPath();
    context.moveTo(x,466);
    context.lineTo(x,0);
    context.stroke();
    context.beginPath();
    context.moveTo(0,transformy(array[Math.round((x/813)*366-30)][1]));// aan data zitten en stuff math.round
    context.lineTo(1000,transformy(array[Math.round((x/813)*366-30)][1]));// x- lengte gebied * aantal punten - afstand van links
    context.stroke();
    // console.log(document.getElementById("tagH").innerHTML)
    // console.log((array[Math.round((x/813)*366-30)][0]))
    document.getElementById("tagH").innerHTML = (array[Math.round((x/813)*366-30)][0]);
    document.getElementById("tagV").innerHTML = (array[Math.round((x/813)*366-30)][1]); // innerHTML veranderen!!
    document.getElementById("tagH").style.top = pixeltransform(y); // functie aanmaken die string maakt met coordinaten vanwege vage zooi
    document.getElementById("tagH").style.left = pixeltransform(x);
    document.getElementById("tagV").style.top = pixeltransform(y); // functie aanmaken die string maakt met coordinaten vanwege vage zooi
    document.getElementById("tagV").style.left = pixeltransform(x);

}
//transform rotate in css!!
function clearCoor() {
    document.getElementById("demo").innerHTML = "";
}
console.log(transformx(75))
console.log(transformx(880))
//g = (event.clientX-rect.left)/(rect.right-rect.left)*width;
function pixeltransform(number){

  var b = "px"
  return b.concat(number.toString())// werkt niet lulz??
}

function inversecreateTransform(domain, range){
	// domain is a two-element array of the domain's bounds
	// range is a two-element array of the range's bounds
	// implement the actual calculation here b = range[0] - a*domain[0]
	// a = range[1]-range[0]/domain[1]-domain[0]
	var alpha = (range[1]-range[0])/(domain[1]-domain[0]) ;
	var beta = range[0]-alpha*domain[0];

	// get rid of the padding of the range
	return function(x){

	return ((alpha-beta)/x);
	};
}
