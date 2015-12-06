window.onload = function() {

d3.select("body").append("h1").html("temperature in de Bilt 1996. ")
delay = 2000
var data;
var format = d3.time.format("%Y%m%d")

d3.json("converted.json", function(data) {
var data = data.map(function(d) {
    return {
      date: format.parse(d[0]),
      temperature: d[1]
    };
});
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width])

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .on("mousemove", mousemove)
    .on("mouseover",function() { focus.style("display", null) ; focus2.style("display",null);})
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  x.domain(d3.extent(data, function(d) { return d.date ; }));
  y.domain([-100,350]);

  svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("temperature in Celcius*10");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("y",-20)
        var focus2 = svg.append("g")
            .attr("class","focus2")
            .style("display","none")

        focus2.append("text")
            .attr("x", 50)
            .attr("dy", ".35em")
            .attr("y", 20)

        var lineX = svg.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("stroke-width", 2)
            .attr("stroke", "black");

        var lineY = svg.append("line")
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke-width", 2)
            .attr("stroke", "black");

bisectDate = d3.bisector(function(d) { return d.date; }).left
        function mousemove() {

          hardx = d3.mouse(this)[0] - margin.left

          var x0 = x.invert(d3.mouse(this)[0] - margin.left)
          i = bisectDate(data, x0, 1); // get position in array
          var y0 = data[i].temperature

          focus.attr("transform", "translate(" +  hardx + "," + y.invert(y0) + ")");
          focus2.attr("transform", "translate(" +  hardx + "," + y.invert(y0) + ")");

          lineX.attr("y1",y.invert(y0));
          lineX.attr("y2",y.invert(y0));
          lineY.attr("x1",hardx);
          lineY.attr("x2",hardx);
          focus.select("text").text("");
          focus2.select("text").text("");
          // werkt niet optimaal maar moet voor de dealy zorgen
          timeOut = setTimeout(function() {
            focus.select("text").text(y0);
            focus2.select("text").text(x0);
          },delay)

        }


});



}
